import '../Styles/App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../Storage/tunes';
import console_monkey_patch, { getD3Data } from '../console-monkey-patch';
import 'bootstrap-icons/font/bootstrap-icons.css';


//Components
import PlayControl from '../Components/PlayControl';
import PlayButtons from '../Components/PlayButtons';
import ProcessButtons from '../Components/ProcessButtons';
import Preprocess from '../Components/Preprocess';
import MusicSearch from '../Components/SearchFunctionality';

//need to use ref, cannot use global variable, react re-renders components and manages state internally.
//let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {
    const hasRun = useRef(false);

    //React refs instead of getElementById
    //references the StrudelMirror instance itself (used to play, stop, or update code)
    const editorRef = useRef(null);

    //avoid using document.getElementById, thus useRef to reference the canvas
    const canvasRef = useRef(null);

    // State to track if music is playing
    const [isPlaying, setIsPlaying] = useState(false);


    // Function runs when the Play button is clicked
    const handlePlay = () => {
        // Plays the current Strudel code in the editor
        editorRef.current?.evaluate();
        setIsPlaying(true); // Update state to indicate music is playing

    };


    //Safely play only if editor exists, avoid errors by checking if editorRef.current is not null
    //works even without the null check but just to be safe
    const handleStop = () => {
        editorRef.current?.stop();
        setIsPlaying(false); // Update state to indicate music has stopped
    }

    //Ref for the editor root element
    //Ref for the Strudel editor container div where the editor will appear
    const editorRootRef = useRef(null);

    // preprocess copies current songData into the editor
    const handlePreprocess = () => {
        if (!editorRef.current) return;

        // Replace the 140 with our CPM value in the existing setcps
        const updatedSongData = songData.replace("setcps(140/60/4)", `setcps(${cpm}/60/4)`);
        const volumeController = `${updatedSongData}\nall(x => x.gain(${volume / 100}))\nall(x => x.log())`;
        editorRef.current.setCode(volumeController);
    };

    // preprocess then play
    const handlePreprocessPlay = () => {
        handlePreprocess();
        handlePlay();
    };

    //music code takes too much space, reduce the space and expand the space to the right, make it 50/50

    //created a varible called song data and used songData as a setter and songData as getter
    //used it like that so that all react hooks are fired when we call the function
    //use empty string as initial value
    const [songData, setSongData] = useState(stranger_tune) //there is only one music called stranger_tune in the storage folder. Inital music 

    //volume state and setter. Initially set to 50.
    const [volume, setVolume] = useState(50);

    //cpm setter. Initially set to 120 by default.
    const [cpm, setCpm] = useState(120);

    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            //const canvas = document.getElementById('roll');
            const canvas = canvasRef.current;

            const drawContext = canvas.getContext('2d');

            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;

            const drawTime = [-2, 2]; // time window of drawn haps
            editorRef.current = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: editorRootRef.current, // root element to mount the editor
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });

            // Removed document.getElementById('proc').value = stranger_tune because the textarea is now controlled by React state (songData)
            // so its value updates automatically without direct DOM manipulation.
        }

        // Combines and updates songData with CPM, volume and log functions
        const updatedSongData = songData.replace("setcps(140/60/4)", `setcps(${cpm}/60/4)`);
        const volumeController = `${updatedSongData}\nall(x => x.gain(${volume / 100}))\nall(x => x.log())`;

        editorRef.current.setCode(volumeController);

        //Updates Strudel editor with new code  song and volume

        if (isPlaying) {
            editorRef.current.stop();
            editorRef.current.evaluate();
        }

    }, [songData, volume, cpm]); // Runs again when songData or volume updates and the cpm


    return (
        <div>
            <h2>Strudel Demo</h2>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            {/*onChange={(e) => setSongText(e.target.value) as there are two preprocess component, using (e) specifies the target  */}
                            <Preprocess defaultValue={songData} onChange={(e) => setSongData(e.target.value)} />


                            {/* calls the Preprocess class*/}
                        </div>
                        <div className="col-md-4">

                            <MusicSearch /> {/* calls the MusicSearch class*/}
                            <nav>
                                {/* calls the ProcessButtons class*/}
                                <ProcessButtons onPreprocess={handlePreprocess} onPreprocessPlay={handlePreprocessPlay} />


                                <br />
                                <PlayButtons onPlay={handlePlay} onStop={handleStop} />  {/* calls the button class and the handle stop and handlePlay function created eariler*/}
                            </nav>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div ref={editorRootRef} />
                            <div id="output" />
                        </div>
                        <div className="col-md-4">
                            <PlayControl
                                volume={volume}
                                onVolumeChange={setVolume}
                                cpm={cpm}
                                onCpmChange={setCpm}
                            /> {/* calls the play control class*/}
                        </div>
                    </div>
                </div>
                {/*by using ref={canvasRef}, we link the canvas element to the canvasRef defined earlier*/}
                <canvas id="roll" ref={canvasRef}></canvas>

            </main >
        </div >
    );
}