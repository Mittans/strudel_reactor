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
import ProcessButtons from './components/ProcessButtons';
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

    if (toggles[key] === false) {
        return `_${name}`;
    } else {
        return name;
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
    const originalSongTextRef = useRef(stranger_tune);

    const handlePlay = () => {
        globalEditor.evaluate();
    };

    const handleStop = () => {
        globalEditor.stop();
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
        
        Object.keys(instrumentMap).forEach((toggleKey) => {
            const instrument = instrumentMap[toggleKey];
            
            // Create regex patterns for both versions
            const normalPattern = new RegExp(`\\b${instrument}:`, 'g');
            const underscorePattern = new RegExp(`\\b_${instrument}:`, 'g');
            
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

    const handleToggleChange = (newToggles) => {
        setToggles(newToggles);
        // Apply toggles to the current song text
        const processedText = applyToggles(songText, newToggles);
        globalEditor.setCode(processedText);
        
        // If already playing, re-evaluate to apply changes immediately
        if (globalEditor.repl.state.started) {
            globalEditor.evaluate();
        }
    };

    const handleSongTextChange = (e) => {
        const newText = e.target.value;
        setSongText(newText);
        originalSongTextRef.current = newText;
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
                        <PreprocessTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                        <div className="col-md-4">
                            <nav>
                                {/* <ProcessButtons /> */}
                                <br />
                                <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                        <div className="col-md-4">
                            <AUXControls onToggleChange={handleToggleChange} />
                        </div>
                    </div>
                </div>
                <canvas id="roll"></canvas>
            </main >
        </div >
    );


}