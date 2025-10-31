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
import console_monkey_patch from './console-monkey-patch';
// import console_monkey_patch, { getD3Data } from './console-monkey-patch';

//import components
import PreprocessorControl from './components/PreprocessorControl';
import TrackControl from './components/TrackControl';
import InstrumentControl from './components/InstrumentControl';
import { tunes2 } from './tunes2';

export default function App() {
    //react state
    const [procText, setProcText] = useState(stranger_tune);
    const [radioValue, setRadioValue] = useState("ON");
    const editorRef = useRef(null);
    const hasRun = useRef(false);
    const [tuneIndex, setTuneIndex] = useState(0);

    //helper and handler functions
    function processText(text, radioState) {
        return text.replaceAll('<p1_Radio>', radioState === "HUSH" ? "_" : "");
    }

    function handleProcess() {
        if (editorRef.current) {
            editorRef.current.setCode(processText(procText, radioValue));
        }
    }

    function handleProcessPlay() {
        handleProcess();
        if (editorRef.current) editorRef.current.evaluate();
    }

    function handlePlay() {
        if (editorRef.current) editorRef.current.evaluate();
    }

    function handleStop() {
        if (editorRef.current) editorRef.current.stop();
    }

    function handleRadioChange(value) {
        setRadioValue(value);
        if (editorRef.current) {
            handleProcess();
            if (editorRef.current.repl.state.started) editorRef.current.evaluate();
        }
    }

    // next and previous tune functions
    function loadTune(index) {
        const tune = tunes2[index];
        setProcText(tune.code);
        if (editorRef.current) {
            editorRef.current.setCode(tune.code);
            editorRef.current.evaluate();
        }
    }

    function nextTune() {
        const nextIndex = (tuneIndex + 1) % tunes2.length;
        setTuneIndex(nextIndex);
        loadTune(nextIndex);
    }

    function prevTune() {
        const prevIndex = (tuneIndex - 1 + tunes2.length) % tunes2.length;
        setTuneIndex(prevIndex);
        loadTune(prevIndex);
    }

    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener("d3Data", event => console.log(event.detail));
            console_monkey_patch();
            //Code copied from example: [https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl](https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl)
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2];
            editorRef.current = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
                prebake: async () => {
                    initAudioOnFirstClick();
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

            editorRef.current.setCode(procText);

            hasRun.current = true;
        }
        //suppress lint warning about missing dependencies
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="strudel-demo-container">
            <h2 style={{ fontWeight: 700, marginBottom: "24px" }}>Strudel Demo</h2>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8">
                            <div className="card">
                                <PreprocessorControl procText={procText} setProcText={setProcText} />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card" style={{ display: "flex", alignItems: "start" }}>
                                <TrackControl
                                    onProcess={handleProcess}
                                    onProcessPlay={handleProcessPlay}
                                    onPlay={handlePlay}
                                    onStop={handleStop}
                                />
                                <div style={{ display: "flex", marginTop: "8px", gap: "8px", justifyContent: "center", marginTop: "0 auto", alignItems: "center" }}>
                                    <button className="btn btn-outline-warning"
                                        onClick={nextTune}
                                        title="Next Tune"
                                        style={{ fontSize: "18px", padding: "6px 12px", borderRadius: "6px", width: "120px", alignItems: "center" }} > Prev </button>
                                    <button className="btn btn-outline-success"
                                        onClick={prevTune}
                                        title="Previous Tune"
                                        style={{ fontSize: "18px", padding: "6px 12px", width: "120px", alignItems: "center" }} > Next </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-md-8">
                            <div className="card" style={{ background: "#1a1b1e", color: "#e3e8ef", minHeight: "220px" }}>
                                <div id="editor" />
                                <div id="output" />
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card">
                                <InstrumentControl onStateChange={handleRadioChange} radioValue={radioValue} />
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: "32px" }}>
                    <canvas id="roll"></canvas>
                </div>
            </main>
        </div>
    );
}
