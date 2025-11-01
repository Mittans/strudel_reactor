import '../App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../tunes';
import console_monkey_patch, { getD3Data } from '../console-monkey-patch';

//Components
import PlayControl from '../Components/PlayControl';
import PlayButtons from '../Components/PlayButtons';
import ProcessButtons from '../Components/ProcessButtons';
import Preprocess from '../Components/Preprocess';

import 'bootstrap-icons/font/bootstrap-icons.css';

//need to use ref, cannot use global variable, react re-renders components and manages state internally.
//let globalEditor = null;





const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {

    const hasRun = useRef(false);

    const editorRef = useRef(null);

    // Function runs when the Play button is clicked
    const handlePlay = () => {
        // Plays the current Strudel code in the editor
        editorRef.current.evaluate();

    };

    const handleStop = () => {
        editorRef.current.stop()
    }




    // preprocess copies current songData into the editor
    const handlePreprocess = () => {
        if (!editorRef.current) return;
        editorRef.current.setCode(songData);
    };

    // preprocess then play
    const handlePreprocessPlay = () => {
        handlePreprocess();
        handlePlay();
    };


    //created a varible called song text and used setSongText as a setter and songText as getter
    //used it like that so that all react hooks are fired when we call the function
    //use empty string as initial value
    const [songData, setSongData] = useState(stranger_tune)






    useEffect(() => {

        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            editorRef.current = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
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

            document.getElementById('proc').value = stranger_tune
            // SetupButtons()
            // Proc()
        }
        editorRef.current.setCode(songData)

    }, [songData]); // Added setSongText as a dependency to ensure the effect runs when songText changes hook




    return (
        <div>
            <h2>Strudel Demo</h2>
            <main>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            {/*onChange={(e) => setSongText(e.target.value) as there are two preprocess component, using (e) specifies the target  */}
                            <Preprocess defaultValue={songData} onChange={(e) => setSongData(e.target.value)} />{/* calls the Preprocess class*/}
                        </div>
                        <div className="col-md-4">

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
                            <div id="editor" />
                            <div id="output" />
                        </div>
                        <div className="col-md-4">
                            <PlayControl /> {/* calls the play control class*/}
                        </div>


                    </div>
                </div>
                <canvas id="roll"></canvas>
            </main >
        </div >
    );


}