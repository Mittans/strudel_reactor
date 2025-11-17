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
import JsonButtons from "./components/JsonButtons";


let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};
export default function StrudelDemo() {

    const hasRun = useRef(false);
    
    const [songText, setSongText] = useState(stranger_tune);
    const [cpm, setCpm] = useState(140);
    const [keyShift, setKeyShift] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [masterVolume, setMasterVolume] = useState(1);
    const [tracksEnabled, setTracksEnabled] = useState({
        bass: true,
        arp: true,
        drums: true,
        drums2: true,
    });
    const [effectChain, setEffectChain] = useState("");

    const handlePlay = () => {
        globalEditor.evaluate()
        setIsPlaying(true);
    }

    const handleStop = () => {
        globalEditor.stop()
        setIsPlaying(false);
    }

    const handleToggleTrack = (name, enabled) => {
        setTracksEnabled((prev) => ({ ...prev, [name]: enabled }));
    };

    const handleSaveJson = () => {
        const settingsObject = { cpm, keyShift, masterVolume, tracksEnabled, songText };

        const jsonBlob = new Blob([JSON.stringify(settingsObject, null, 2)], {
            type: "application/json"
        });

        const jsonUrl = URL.createObjectURL(jsonBlob);
        const downloadLink = document.createElement("a");
        downloadLink.href = jsonUrl;
        downloadLink.download = "strudel-settings.json";
        downloadLink.click();
        URL.revokeObjectURL(jsonUrl);
    };

    const handleLoadJson = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;

        const fileReader = new FileReader();
        fileReader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);

                // Restore each setting if present
                if (typeof data.cpm === "number") setCpm(data.cpm);
                if (typeof data.keyShift === "number") setKeyShift(data.keyShift);
                if (typeof data.masterVolume === "number") setMasterVolume(data.masterVolume);
                if (typeof data.songText === "string") setSongText(data.songText);
                if (typeof data.tracksEnabled === "object") setTracksEnabled(data.tracksEnabled);

                alert("JSON load successfully");
            } catch {
                alert("Invalid JSON file.");
            }
        };
        fileReader.readAsText(selectedFile);
    };

    const handleEffectChange = (newEffectChain) => {
        setEffectChain(newEffectChain);
    };


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
        //SetupButtons()
        //Proc()
    }

    const processed = songText
        .replaceAll("<cpm>", cpm.toString())
        .replaceAll("<keyshift>", keyShift.toString())
        .replaceAll("<volume>", masterVolume.toString())
        .replaceAll("<gain_bass>", tracksEnabled.bass ? "1" : "0")
        .replaceAll("<gain_arp>", tracksEnabled.arp ? "1" : "0")
        .replaceAll("<gain_drums>", tracksEnabled.drums ? "1" : "0")
        .replaceAll("<gain_drums2>", tracksEnabled.drums2 ? "1" : "0")
        .replaceAll("<effect_chain>", effectChain ? `.${effectChain}` : "");

    //globalEditor.setCode(songText);
    globalEditor?.setCode(processed);

    if (isPlaying && globalEditor) {
        globalEditor.evaluate();
    }

}, [songText, cpm, keyShift, masterVolume, tracksEnabled, effectChain, isPlaying]);


return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <div className="container-fluid">
                <a className="navbar-brand fw-bold" href="/app">
                    Strudel Digital Audio Workstation
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    </ul>
                    <button className="btn btn-outline-light"
                        onClick={() => {document.body.classList.toggle("light-theme");}}>
                        Switch Theme
                    </button>
                </div>
            </div>
        </nav>
        <main className="container-fluid">

            <div className="row mb-3">
                <div className="col-12 d-flex justify-content-between align-items-center">
                    <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                    <JsonButtons onSaveJson={handleSaveJson} onLoadJson={handleLoadJson} />
                </div>
            </div>

            <DJControls cpm={cpm} onCpmChange={setCpm} keyShift={keyShift} onKeyShiftChange={setKeyShift} volume={masterVolume}
                onVolumeChange={setMasterVolume} tracksEnabled={tracksEnabled} onToggleTrack={handleToggleTrack} onEffectChange={handleEffectChange}/>

            <div className="row mt-4">
                <div className="col-md-6">
                    <div className="accordion" id="accordion-left">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button" data-bs-toggle="collapse"
                                    data-bs-target="#preprocess-area">
                                    Preprocess Textarea
                                </button>
                            </h2>
                            <div id="preprocess-area" className="accordion-collapse collapse show">
                                <div className="accordion-body" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                                    <PreprocessTextarea defaultValue={songText} onChange={(e) => setSongText(e.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="accordion" id="accordion-right">
                        <div className="accordion-item">
                            <h2 className="accordion-header">
                                <button className="accordion-button"
                                    data-bs-toggle="collapse"
                                    data-bs-target="#editor-area">
                                    Strudel Editor Output
                                </button>
                            </h2>
                            <div id="editor-area" className="accordion-collapse collapse show">
                                <div className="accordion-body" style={{ maxHeight: "60vh", overflowY: "auto" }}>
                                    <div id="editor"></div>
                                    <div id="output"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main>
    </div >
);


}