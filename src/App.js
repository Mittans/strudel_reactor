import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreprocessTextarea from './components/PreprocessTextarea';
import SoundGraph from './components/SoundGraph';

// This file is the main brain and has all the base logic in it. 

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export default function StrudelDemo() {

    const hasRun = useRef(false);

    // This function controls all the replacements in the preprocessing text and then is used by proc & play
    const processSongText = () => {
        return songText
            .replaceAll("<s1>", s1 ? "" : "_")
            .replaceAll("<d1>", d1 ? "" : "_")
            .replaceAll("<d2>", d2 ? "" : "_")
            .replaceAll("<cpm>", cpm)
            .replaceAll("<volume>", volume)
            .replaceAll("{volumeD1}", d1Vol)
            .replaceAll("{volumeD2}", d2Vol)
            .replaceAll("{volumeS1}", s1Vol)
            .replaceAll("<echo>", echo)

    };

    // Play function to start the strudel tune
    const handlePlay = () => {
        globalEditor.setCode(processSongText());
        globalEditor.evaluate();
        setIsPlaying(true);
    }

    // stop function to stop the strudel tune
    const handleStop = () => {
        globalEditor.stop();
        setIsPlaying(false);
    }

    // this fucntion just sets the preprocessTextarea's text to strudel repl
    const handlePreprocess = () => {
        if (globalEditor) {
            globalEditor.setCode(processSongText());
        }
    };

    // this function adapts with changes in the textarea and evalutes it in strudel repl (basically play it)
    const handleProcAndPlay = () => {
        if (globalEditor) {
            globalEditor.setCode(processSongText());
            globalEditor.evaluate();
            setIsPlaying(true);
        }
    };
    
    // these are all the react useState's which then each components takes in and uses these setter to change these values
    const [songText, setSongText] = useState(stranger_tune)
    const [s1, setS1] = useState(true);
    const [d1, setD1] = useState(true);
    const [d2, setD2] = useState(true);
    const [cpm, setCpm] = useState("140");
    const [volume, setVolume] = useState(0.5);
    const [s1Vol, sets1Vol] = useState(10);
    const [d2Vol, setd2Vol] = useState(0.8);
    const [d1Vol, setd1Vol] = useState(0.2);
    const [jsonText, setJsonText] = useState("");
    const [echo, setEcho] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);

// this useeffect is for applying changes to the preprocessing text (stranger tune) whenever any of the component changes its state.
useEffect(() => {
    if (!isPlaying) return;   // only auto-update while playing

    // Auto regenerate and play Strudel
    if (globalEditor) {
        globalEditor.setCode(processSongText());
        globalEditor.evaluate();
    }
}, [cpm, volume, s1, d1, d2, s1Vol, d1Vol, d2Vol, echo]);


// my react useeffect's purpose is to setup the website in the begin just that I can be ready to play
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
            globalEditor = new StrudelMirror({
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

        let initial = processSongText(stranger_tune);
                                                                          
        globalEditor.setCode(initial);
        //SetupButtons()
        //Proc()
    }
    
}, [songText]);


return (
    <div>
        
        <main>

            <div className="container-fluid">
                <div className="row">
                    <nav className="navbar custom-navbar mb-3">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="#">
                                     Strudel Demo
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="row">
                    <div className="col-md-6" >
                        <PreprocessTextarea defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                    </div>
                    <div className="col-md-6 justify-content-end">
                        <nav className="container">
                            <div className="row text-center">
                                <div className="col-md-6 col-sm-12">
                                    <ProcButtons onPreprocess={handlePreprocess} onProcAndPlay={handleProcAndPlay} songText={songText} />
                                </div>
                                <div className="col-md-6 col-sm-12">
                                    <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                                </div>
                            </div>
                        </nav>
                        <div className="row mb-3 me-1"><SoundGraph isPlaying={isPlaying} /></div>
                        {/*<nav>*/}
                        {/*    <ProcButtons onPreprocess={handlePreprocess} onProcAndPlay={handleProcAndPlay} songText={songText} />*/}
                            
                        {/*    <PlayButtons onPlay={handlePlay} onStop={handleStop} />*/}
                        {/*</nav>*/}
                    </div>
                    
                </div>
                <div className="row">
                    <div className="col-md-6" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                        <div id="editor" />
                        <div id="output" />
                    </div>
                    <div className="col-md-6">
                        
                        <DJControls
                            songText={songText}
                            s1={s1} setS1={setS1}
                            d1={d1} setD1={setD1}
                            d2={d2} setD2={setD2}
                            cpm={cpm} setCpm={setCpm}
                            onProcess={handleProcAndPlay}
                            cleanText={processSongText}
                            volume={volume}
                            s1Vol={s1Vol} sets1Vol={sets1Vol}
                            d1Vol={d1Vol} setd1Vol={setd1Vol}
                            d2Vol={d2Vol} setd2Vol={setd2Vol}
                            setVolume={setVolume}
                            jsonText={jsonText} setJsonText={setJsonText}
                            echo={echo} setEcho={setEcho}
                        />
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main >
    </div >
        );
}