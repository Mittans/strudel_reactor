import './App.css';
import { use, useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import AUXControls from './components/AUXControls';
import PlayButtons from './components/PlayButtons';
// import ProcessButtons from './components/ProcessButtons';
import PreprocessTextArea from './components/PreprocessTextArea';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};


export function ProcessText(index, toggles) {
    const instrumentals = ['baseline', 'main_arp', 'drums', 'drum_set_2'];
    const name = instrumentals[index];

    // Map index to the toggle key
    const keys = Object.keys(toggles);
    const key = keys[index];

    // Returns instruments name whether it is toggled on / off
    if (toggles[key] === false) {
        return `_${name}`; // Toggle Off
    } else {
        return name; // Toggle On
    }
}


export default function StrudelDemo() {
    const hasRun = useRef(false);
    
    const [songText, setSongText] = useState(stranger_tune);
    const [toggles, setToggles] = useState({ 
        Baseline: true, 
        MainArp: true, 
        Drums: true,
        Drums2: true
    });
    const [currentBpm, setCurrentBpm] = useState(140);
    const [currentVolume, setCurrentVolume] = useState(0.7);

 
    const handlePlay = () => {
        globalEditor.evaluate(); // Runs strudel playback code
    };

    const handleStop = () => {
        globalEditor.stop(); // Stops strudel playback code
    };

    const applyToggles = (text, toggles) => {
        // Map UI toggle names to actual instrument names in the code
        const instrumentMap = {
            'Baseline': 'bassline',
            'MainArp': 'main_arp',
            'Drums': 'drums',
            'Drums2': 'drums2'
        };
        
        let processed = text;
        
        // Loops through each toggle ^
        Object.keys(instrumentMap).forEach((toggleKey) => {
            const instrument = instrumentMap[toggleKey];
            
            // Create regex (finds text inside strings) patterns for both versions
            // "\\b" looks for exact match e.g, "baseline"
            const normalPattern = new RegExp(`\\b${instrument}:`); // Looks for first instrumental thats turned on
            const underscorePattern = new RegExp(`\\b_${instrument}:`); // Looks for first muted instrumented with "_"
            

            if (toggles[toggleKey] === false) {
                // Replace "instrument:" with "_instrument:"
                processed = processed.replace(normalPattern, `_${instrument}:`);
            } else {
                // Replace "_instrument:" with "instrument:"
                processed = processed.replace(underscorePattern, `${instrument}:`);
            }
        });
        
        return processed;
    };

    const applyBpm = (text, bpm) => {
        // Replace the BPM value in setcps(140/60/4) pattern
        const cpsPattern = /setcps\((\d+)\/60\/4\)/;
        return text.replace(cpsPattern, `setcps(${bpm}/60/4)`);
    };

    const applyVolume = (text, gainValue) => {
        // Replace the gain value in all(x => x.gain(0.7)) pattern
        const gainPattern = /all\(x => x\.gain\([\d.]+\)\)/;
        return text.replace(gainPattern, `all(x => x.gain(${gainValue}))`);
    };

    // Unified function to apply all current settings to the song text
    const applyAllSettings = (text, bpm, volume, toggleState) => {
        let processed = text;
        processed = applyBpm(processed, bpm);
        processed = applyVolume(processed, volume);
        processed = applyToggles(processed, toggleState);
        return processed;
    };

    // Update editor with current settings
    const updateEditor = () => {
        if (!globalEditor) return;
        const processedText = applyAllSettings(songText, currentBpm, currentVolume, toggles);
        globalEditor.setCode(processedText);
        
        // If already playing, re-evaluate to apply changes immediately
        if (globalEditor.repl.state.started) {
            globalEditor.evaluate();
        }
    };

    // Live updates the toggle state
    const handleToggleChange = (newToggles) => {
        setToggles(newToggles);
        if (!globalEditor) return;
        
        const processedText = applyAllSettings(songText, currentBpm, currentVolume, newToggles);
        globalEditor.setCode(processedText);
        
        if (globalEditor.repl.state.started) {
            globalEditor.evaluate();
        }
    };

    const handleBpmChange = (newBpm) => {
        setCurrentBpm(newBpm);
        if (!globalEditor) return;
        
        const processedText = applyAllSettings(songText, newBpm, currentVolume, toggles);
        globalEditor.setCode(processedText);
        
        if (globalEditor.repl.state.started) {
            globalEditor.evaluate();
        }
    };

    const handleVolumeChange = (gainValue) => {
        setCurrentVolume(gainValue);
        if (!globalEditor) return;
        
        const processedText = applyAllSettings(songText, currentBpm, gainValue, toggles);
        globalEditor.setCode(processedText);
        
        if (globalEditor.repl.state.started) {
            globalEditor.evaluate();
        }
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

        }
        globalEditor.setCode(songText);
    }, [songText]);


return (
    <div>
        <h2>Strudel Demo</h2>
        <main>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8">
                        <PreprocessTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                        <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                    </div>
                    <div className="col-md-4">
                        <nav>
                            <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                            <AUXControls 
                                onToggleChange={handleToggleChange}
                                onBpmChange={handleBpmChange}
                                onVolumeChange={handleVolumeChange}
                            />
                        </nav>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </main>
    </div>
);


}