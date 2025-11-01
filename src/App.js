import './App.css';
import { useState, useRef, useEffect } from "react";
// import { StrudelMirror } from '@strudel/codemirror';
// import { evalScope } from '@strudel/core';
// import { drawPianoroll } from '@strudel/draw';
// import { initAudioOnFirstClick } from '@strudel/webaudio';
// import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
// import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import StrudelPlayer from './components/StrudelPlayer';
import console_monkey_patch from './console-monkey-patch';

import DJControls from './components/DJControls';
import MenuButtons from './components/MenuButtons';
import PlayButtons from './components/PlayButtons';
import ProcButtons from './components/ProcButtons';
import PreprocessTextArea from './components/PreprocessTextArea';
import ErrorTextArea from './components/ErrorTextArea';
import HelpPanel from './components/HelpPanel';
import ControlPanel from './components/ControlPanel';
import ConsolePanel from './components/ConsolePanel';


let strudelRef = null;
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

//     document.getElementById('play').addEventListener('click', () => strudelRef.evaluate());
//     document.getElementById('stop').addEventListener('click', () => strudelRef.stop());
//     document.getElementById('process').addEventListener('click', () => {
//         Proc()
//     }
//     )
//     document.getElementById('process_play').addEventListener('click', () => {
//         if (strudelRef != null) {
//             Proc()
//             strudelRef.evaluate()
//         }
//     }
//     )
// }

// replaced with react
// export function ProcAndPlay() {
//     if (strudelRef != null && strudelRef.repl.state.started == true) {
//         console.log(strudelRef)
//         Proc()
//         strudelRef.evaluate();
//     }
// }

// replaced with react
//  export function Proc() {

//      let proc_text = document.getElementById('proc').value
//      ProcessText(stranger_tune);
//      strudelRef.setCode(stranger_tune)
//  }

// // replaced with react
//  export function ProcessText(match, ...args) {

//      let replace = stranger_tune;

//      return replace
//  }


// TODO: yk, if i'm exporting this, I could likely separate App.js and StrudelDemo
// export const setGlobalVolume = (volume) => {
//     console.log("new setVolume used");
//     const ctx = getAudioContext();
//     if (volumeControlRef != null){
//         volumeControlRef = ctx.createGain(); // volume based on gain, have to create it like so
//         volumeControlRef.connect(ctx.destination);
        
//     volumeControlRef.gain.value = volume;
//     console.log("volumeControlRef.gain.value - " + volumeControlRef.gain.value);
//     } else {
//         console.log("failed condition checker in setGlobalVolume");
//     }
// }

function App() {
    // this in App allows me to have one constant ref for both StrudelPlayer and StrudelSetup 
    const strudelRef = useRef();
    return (
        <div>
            <StrudelPlayer 
                strudelRef={strudelRef}
            />
        </div >
    );


}

export default App;