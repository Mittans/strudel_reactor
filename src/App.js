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

import DJControls from './components/DJControls';
import Buttons from './components/Buttons';
import ProcButtons from './components/ProcButtons';
import PreprocessEditor from './components/PreprocessEditor';
import Graph from './components/Graph';

let globalEditor = null;

export default function StrudelDemo() {

    const hasRun = useRef(false);

    const [songText, setSongText] = useState(stranger_tune);
    const [volume, setVolume] = useState(0.8);
    const [cpm, setCpm] = useState(120);       
    const [bass, setBass] = useState(true);
    const [melody, setMelody] = useState(true);
    const [guitar, setGuitar] = useState(true);
    const [drums1, setDrums1] = useState(true);
    const [drums2, setDrums2] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    const [message, setMessage] = useState("");

    // JSON UI toggle
    const [showJSON, setShowJSON] = useState(false);
    const [loadedJSON, setLoadedJSON] = useState(null);

    function showMessage(msg) {
        setMessage(msg);
        setTimeout(() => setMessage(""), 1500);
    }

    // SAVE SETTINGS
    function saveSettings() {
        const settings = {
            volume,
            cpm,
            drums1,
            drums2,
            bass,
            melody,
            guitar
        };

        localStorage.setItem("strudelSettings", JSON.stringify(settings));

        setMessage("Settings saved!");
        setTimeout(() => setMessage(""), 1500);
    }

    function loadSettings() {
        const saved = localStorage.getItem("strudelSettings");
        if (!saved) {
            setMessage("No saved settings found.");
            setTimeout(() => setMessage(""), 1500);
            return;
        }

        const settings = JSON.parse(saved);

        if (settings.volume !== undefined) setVolume(settings.volume);
        if (settings.cpm !== undefined) setCpm(settings.cpm);
        if (settings.drums1 !== undefined) setDrums1(settings.drums1);
        if (settings.drums2 !== undefined) setDrums2(settings.drums2);
        if (settings.bass !== undefined) setBass(settings.bass);
        if (settings.melody !== undefined) setMelody(settings.melody);
        if (settings.guitar !== undefined) setGuitar(settings.guitar);

        setLoadedJSON(settings);

        setMessage("Settings loaded.");
        setTimeout(() => setMessage(""), 1500);
    }


    // PLAY
    const handlePlay = () => {
        globalEditor.evaluate();
        setIsPlaying(true);
    };

    // STOP
    const handleStop = () => {
        globalEditor.stop();
        setIsPlaying(false);
    };

    // HOTKEYS
    useEffect(() => {
        function handleKeyPress(e) {
            const key = e.key.toLowerCase();

            if (key === "k") handlePlay();
            if (key === "l") handleStop();
            if (key === "h") setDrums1(prev => !prev);
            if (key === "j") setBass(prev => !prev);
        }

        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, []);

    // UPDATE STRUDEL CODE
    const updateStrudelCode = (text) => {
        const processedText = text
            .replaceAll("<volume>", volume)
            .replaceAll("<cpm>", cpm)
            .replaceAll("<bass>", bass ? "" : "_")
            .replaceAll("<melody>", melody ? "" : "_")
            .replaceAll("<guitar>", guitar ? "" : "_")
            .replaceAll("<drums1>", drums1 ? "" : "_")
            .replaceAll("<drums2>", drums2 ? "" : "_");

        globalEditor.setCode(processedText);
        globalEditor.evaluate();
    };

    // PREPROCESS ONLY
    const handlePreprocess = () => {
        globalEditor.setCode(songText);
    };

    // PREPROCESS + PLAY
    const handleProcPlay = () => {
        updateStrudelCode(songText);
        globalEditor.evaluate();
    };

    // VOLUME CHANGE
    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);

        if (isPlaying) {
            updateStrudelCode(songText);
        }
    };

    // INITIALISE STRUDEL + ONLY UPDATE WHEN PLAYING
    useEffect(() => {
        if (!hasRun.current) {
            console_monkey_patch();
            hasRun.current = true;

            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2];

            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) =>
                    drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),

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

            document.getElementById('proc').value = stranger_tune;
            globalEditor.setCode(stranger_tune);
        } else {
            if (isPlaying) {
                updateStrudelCode(songText);
            }
        }

    }, [bass, melody, guitar, drums1, drums2, volume, cpm, isPlaying]);

    return (
        <div>
            <h2 id="h2">Strudel Demo - Midnight in Motion</h2>

            {/* JSON TOGGLE BUTTON */}
            <button
                className="json-toggle-btn"
                onClick={() => setShowJSON(prev => !prev)}
            >
                {showJSON ? "Hide JSON" : "Show JSON"}
            </button>

            {/* ALWAYS SHOW JSON WHEN TOGGLED */}
            {showJSON && (
                <div className="json-box-wrapper d-flex justify-content-center">
                    <pre className="json-box">
                        {loadedJSON
                            ? JSON.stringify(loadedJSON, null, 2)
                            : "No JSON loaded yet"}
                    </pre>
                </div>
            )}

            {/* MESSAGE */}
            {message && <div className="message-box">{message}</div>}

            <main>
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-md-6">
                            <PreprocessEditor
                                defaultValue={songText}
                                onChange={(e) => setSongText(e.target.value)}
                            />
                        </div>

                        <div className="col-md-6">
                            <nav>
                                <ProcButtons onPreprocess={handlePreprocess} onProcPlay={handleProcPlay} />
                                <br />
                                <Buttons onPlay={handlePlay} onStop={handleStop} />
                                <br />
                            </nav>
                            {/* PUT VOLUME RIGHT UNDER THE BUTTONS */}
                            <div id="volume-wrapper">
                                <label id="volume-label">Volume ({Math.round(volume * 100)}%)</label>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.01"
                                    value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    id="volume-range"
                                />
                            </div>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <div id="editor" />
                            <div id="output" />
                        </div>

                        <div className="col-md-5 right-panel">
                            <div className="graph-wrapper">
                                <Graph isPlaying={isPlaying} />
                            </div>
                            <div className="dj-wrapper">
                                <DJControls              
                                    cpm={cpm}
                                    setCpm={setCpm}
                                    onCpmChange={(e) => setCpm(e.target.value)}
                                    onMessage={showMessage}

                                    bass={bass}
                                    onBassChange={() => setBass(!bass)}

                                    melody={melody}
                                    onMelodyChange={() => setMelody(!melody)}

                                    guitar={guitar}
                                    onGuitarChange={() => setGuitar(!guitar)}

                                    drums1={drums1}
                                    onDrums1Change={() => setDrums1(!drums1)}

                                    drums2={drums2}
                                    onDrums2Change={() => setDrums2(!drums2)}

                                    onSave={saveSettings}
                                    onLoad={loadSettings}
                                />
                            </div>
                            
                        </div>
                    </div>
                </div>

                <canvas id="roll"></canvas>
            </main>
        </div>
    );
}
