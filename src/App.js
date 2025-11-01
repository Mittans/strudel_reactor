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
let volumeControlRef = null;

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
export const setGlobalVolume = (volume) => {
    console.log("new setVolume used");
    const ctx = getAudioContext();
    if (volumeControlRef != null){
        volumeControlRef = ctx.createGain(); // volume based on gain, have to create it like so
        volumeControlRef.connect(ctx.destination);
        
    volumeControlRef.gain.value = volume;
    console.log("volumeControlRef.gain.value - " + volumeControlRef.gain.value);
    } else {
        console.log("failed condition checker in setGlobalVolume");
    }
}

export default function StrudelDemo() {
    //TODO: fix the fact that proc&play can play multiple overlapping strudels, lol

    let strudelRef = useRef();
    let [songText, setSongText] = useState(stranger_tune);

    const hasRun = useRef(false);

    useEffect(() => {
        console.log("aaa");
    }, [songText]);

    const handlePlay = () => {
        strudelRef.current.evaluate();
    }

    const handleStop = () => {
        strudelRef.current.stop();
    }

    const handleProc = () => {
        handleStop();
        //console.log("handleProc triggered");
        strudelRef.current.setCode(document.getElementById('proc').value);
    }

    const handleProcPlay = () => {
        handleStop();
        //console.log("handleProcPlay triggered");
        strudelRef.current.setCode(document.getElementById('proc').value);
        strudelRef.current.evaluate();
    }

    const handleReset = () => {
        handleStop();
        //console.log("handleReset triggered");
        document.getElementById('proc').value = defaultTune;
        // @TODO: this needs to reset settings, too! otherwise we're allowing for errors 
        strudelRef.current.setCode(defaultTune);
    }

    //const [ songText, setSongText ] = useState(stranger_tune)
    const [ showErrText, setShowErrText ] = useState(false) // for later use
    const [ activeBtn, setActiveBtn ] = useState("controlBtn")
    const [ settings, setSetting ] = useState()

    //const [ volume, setVolume ] = useState(1)

    function handleSettings(codeString) {
        strudelRef.current.setCode(codeString);

        //console.log("handle settings id, newValue : " + id + " | " + newValue);
        // let proc_text = document.getElementById({id}).value
        // let proc_text_replaced = proc_text.replaceAll('{VOLUME}', {volume});
        // strudelRef.setCode(proc_text_replaced)
    }

    // const handleMenu = (e) => {
    //     console.log(e);
    //     currentMenu = e;
    // }


    return (
        <div>
            <h2 className="row">
                <div className="col">Strudel</div>
                <div className="col-lg-auto">
                    <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                    <ProcButtons onProc={handleProc} onProcPlay={handleProcPlay} onReset={handleReset} />
                </div>
            </h2>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" id="leftPanel">
                            <StrudelPlayer 
                                    songText={songText} 
                                    strudelRef={strudelRef} 
                            />
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

                        <div className="col-md-4 bg-white" id="rightPanel">
                            {/* the nav menu for right panel -- should control whats in box below on page and be highlighted when active */}
                            <div className="menuNavBar bg-light">
                                <MenuButtons defaultValue={activeBtn} onClick={(e) => {
                                    setActiveBtn(e)
                                    //console.log("activeBtn : " + e);
                                }}/>
                            </div>
                            <div>
                                {/* this is essentially a big if-if-if rn */}
                                { (activeBtn === "helpBtn") ? < HelpPanel /> : null }
                                { (activeBtn === "controlBtn") ? < ControlPanel /> : null }
                                { (activeBtn === "consoleBtn") ? < ConsolePanel /> : null }
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
