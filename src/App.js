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
import MenuButtons from './components/MenuButtons';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreprocessTextArea from './components/PreprocessTextArea';
import ErrorTextArea from './components/ErrorTextArea';
import HelpPanel from './components/HelpPanel';
import ControlPanel from './components/ControlPanel';
import ConsolePanel from './components/ConsolePanel';

let globalEditor = null;
let defaultTune = stranger_tune;

const handleD3Data = (event) => {
    console.log(event.detail);
};

/* So:
 * play         - processes & plays
 * stop         - stops
 * pre-processs - updates the code with text area(?)
 * process      - processees text; applies changes (originally for a radio box that replaces certain text in the code)
 * 
 * I'm thinking that I have a play/stop/process system, where play plays whatever is there and process is needed to update
 * maybe have a feature that plays it, but does not process any control-menu changes, just the code from text area?
 */

// replaced with react
// export function SetupButtons() {

//     document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//     document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//     document.getElementById('process').addEventListener('click', () => {
//         Proc()
//     }
//     )
//     document.getElementById('process_play').addEventListener('click', () => {
//         if (globalEditor != null) {
//             Proc()
//             globalEditor.evaluate()
//         }
//     }
//     )
// }

// replaced with react
// export function ProcAndPlay() {
//     if (globalEditor != null && globalEditor.repl.state.started == true) {
//         console.log(globalEditor)
//         Proc()
//         globalEditor.evaluate();
//     }
// }

// replaced with react
//  export function Proc() {

//      let proc_text = document.getElementById('proc').value
//      ProcessText(stranger_tune);
//      globalEditor.setCode(stranger_tune)
//  }

// // replaced with react
//  export function ProcessText(match, ...args) {

//      let replace = stranger_tune;

//      return replace
//  }


export default function StrudelDemo() {

const hasRun = useRef(false);

const handlePlay = () => {
    //Proc();
    globalEditor.evaluate();
    //globalEditor.setCode(songText);
    //setShowErrText(true);
    //console.log("eventDetail : " + eventDetail);
    
}
const handleStop = () => {
    if (hasRun){
        globalEditor.stop();
    } else {

    }
}

const [ songText, setSongText ] = useState(stranger_tune)
const [ showErrText, setShowErrText ] = useState(false) // for later use
const [ activeBtn, setActiveBtn ] = useState("control")

// const handleMenu = (e) => {
//     console.log(e);
//     currentMenu = e;
// }

useEffect(() => {
    
    if (!hasRun.current) {
        
        document.addEventListener("d3Data", handleD3Data);
        try {
            console_monkey_patch();
        } catch {
            console.log("aa");
        }
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
            
        document.getElementById('proc').value = stranger_tune;
        //SetupButtons()
        //Proc()/
    }
    
    globalEditor.setCode(songText);
}, [songText]);


return (
    <div>
        <h2 className="row">
            <div className="col">Strudel Demo</div>
            <div className="col-lg-auto">
                <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                <ProcButtons />
            </div>
        </h2>
        <main>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-8" id="leftPanel">
                        
                        <div className="" id="editorPanel" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            {/* e knows where it is because it knows where it isn't.
                            ... not really, i'm assuming e just has a reference to self or smth */}
                            <PreprocessTextArea defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                        </div>
                        <div className="" id="codePanel" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                    </div>

                    <div className="col-md-4" id="rightPanel">
                        {/* the nav menu for right panel -- should control whats in box below on page and be highlighted when active */}
                        <div className="menuNavBar">
                            <MenuButtons defaultValue={activeBtn} onClick={(e) => setActiveBtn(e)} />
                           
                        </div>
                        <div>
                            <br />
                            {/* this is essentially a big if-if-if rn */}
                            { (activeBtn == "helpBtn") ? < HelpPanel /> : null }
                            { (activeBtn == "controlBtn") ? < ControlPanel /> : null }
                            { (activeBtn == "consoleBtn") ? < ConsolePanel /> : null }
                        </div>
                        
                    </div>
                    
                </div>
            </div>
            {/* this should only appear when errors detected -- relies on a conditionals state to show */}
            { showErrText ? < ErrorTextArea defaultValue={showErrText} /> : null }
            <canvas id="roll"></canvas>
        </main >
    </div >
);


}