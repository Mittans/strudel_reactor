import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { djf, evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune, algorave_dave_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreTextArea from './components/PreTextArea';
import { Preprocess } from './utils/PreprocessLogic'

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        let outputText = Preprocess({ inputText: procText, volume: volume, bpm });
        globalEditor.setCode(outputText);
        globalEditor.evaluate();
    };

    const handleStop = () => {
        globalEditor.stop();
    };

    const [procText, setProcText] = useState(algorave_dave_tune);
    const [volume, setVolume] = useState(1);
    const [state, setState] = useState("stop");
    const [bpm, setBpm] = useState(120);

    useEffect(() => {
        if (state === "play") {
            handlePlay();
        }
    }, [volume, bpm]);

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
            
        document.getElementById('proc').value = procText
        //SetupButtons()
        //Proc()
    }
    globalEditor.setCode(procText);
}, [procText]);


return (
    <div>
        <main>
            <div className="container-fluid p-0">

                <section className="vh-100 d-flex flex-column justify-content-center align-items-center bg-dark text-white">
                    <h1>Strudel Demo</h1>
                    <div className="card shadow" style={{ width: '70%' }}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <div>
                                    <PlayButtons onPlay={() => { setState("play"); handlePlay(); }}
                                        onStop={() => { setState("stop"); handleStop(); }} />
                                </div>

                            </div>

                            <DJControls volume={volume} onVolumeChange={(e) => setVolume(e.target.value)}
                                bpm={bpm} onBpmChange={(e) => setBpm(Number(e.target.value || 0))}
                            />
                        </div>
                    </div>

                </section>


                <section className="vh-100 overflow-auto bg-light">
                    <canvas id="roll" className="w-100 border rounded shadow-sm"></canvas>
                </section>


                <section className="vh-100 overflow-auto bg-light">
                    <div className="container py-4">
                        <h2>Editor & Output</h2>
                        <div>
                            <PreTextArea defaultValue={procText} onChange={(e) => setProcText(e.target.value)} />
                            <div id="editor" />
                            <div id="output" />
                        </div>
                    </div>
                </section>

            </div>

        </main >
    </div >
);


}