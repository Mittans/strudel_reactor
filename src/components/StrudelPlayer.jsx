import { useEffect, useRef, useState } from "react";
// import { StrudelMirror } from '@strudel/codemirror';
// import { evalScope } from '@strudel/core';
// import { drawPianoroll } from '@strudel/draw';
// import { initAudioOnFirstClick } from '@strudel/webaudio';
// import { transpiler } from '@strudel/transpiler';
// import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
// import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../tunes';
import console_monkey_patch from '../console-monkey-patch';

import DJControls from './DJControls';
import MenuButtons from './MenuButtons';
import PlayButtons from './PlayButtons';
import ProcButtons from './ProcButtons';
import PreprocessTextArea from './PreprocessTextArea';
import ErrorTextArea from './ErrorTextArea';
import HelpPanel from './HelpPanel';
import ControlPanel from './ControlPanel';
import ConsolePanel from './ConsolePanel';
import { StrudelSetup } from './StrudelSetup';
import { handlePlay, handleStop, handleProc, handleProcPlay, handleReset } from './StrudelSetup';

let defaultTune = stranger_tune;

let strudelRef = null;
let globalEditor = null;
let StrudelDemoThingo = null;

//let volumeControlRef = null;

// export const setGlobalVolume = (volume) => {
//     console.log("new setVolume used");
//     const ctx = getAudioContext();
//     if (volumeControlRef == null){
//         volumeControlRef = ctx.createGain(); // volume based on gain, have to create it like so
//         volumeControlRef.connect(ctx.destination);
//     } else {
//         console.log("failed condition checker in setGlobalVolume");
//     }
//     volumeControlRef.gain.value = volume;
//     console.log("volumeControlRef.gain.value - " + volumeControlRef.gain.value);
// }

// strudelRef references the strudel/globaleditor 
// this is basically the new StrudelDemo from App.js
function StrudelPlayer({ strudelRef }) {
    //TODO: fix the fact that proc&play can play multiple overlapping strudels, lol

    //let strudelRef = useRef();
    const hasRun = useRef(false);
    const [songText, setSongText] = useState(stranger_tune);

    // on load the player needs to setup the strudel
    useEffect(() => {
        console.log("StrudelPlayer useEffect called");

        if (!hasRun.current) {
            hasRun.current = true;
            // strudelRef
            StrudelSetup(songText, setSongText, strudelRef);
        }
        //console.log("a : " + a);
    }, []);

    // const handlePlay = () => {
    //     //console.log("volumeControlRef.gain.value - " + volumeControlRef.gain.value); // proving volume saved in state (will need to update controlPanel tho)
    //     strudelRef.current.evaluate();
    // }

    // const handleStop = () => {
    //     strudelRef.current.stop();
    // }

    // const handleProc = () => {
    //     handleStop();
    //     //console.log("handleProc triggered");
    //     strudelRef.current.setCode(document.getElementById('proc').value);
    // }

    // const handleProcPlay = () => {
    //     handleStop();
    //     //console.log("handleProcPlay triggered");
    //     strudelRef.current.setCode(document.getElementById('proc').value);
    //     strudelRef.current.evaluate();
    // }

    // const handleReset = () => {
    //     handleStop();
    //     //console.log("handleReset triggered");
    //     document.getElementById('proc').value = defaultTune;
    //     // @TODO: this needs to reset settings, too! otherwise we're allowing for errors 
    //     strudelRef.current.setCode(defaultTune);
    // }

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
                <div className="col">Strudel Demo</div>
                <div className="col-lg-auto">
                    <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                    <ProcButtons onProc={handleProc} onProcPlay={handleProcPlay} onReset={handleReset} />
                </div>
            </h2>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" id="leftPanel">
                            {/* <StrudelPlayer 
                                    songText={songText} 
                                    strudelRef={strudelRef} 
                            /> */}
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
// function StrudelPlayer( {songText, strudelRef} ) {
//     const handleD3Data = (event) => {
//         console.log(event.detail);
//     };

//     const hasRun = useRef(false);

//     // first useEffect is on mount/load
//     useEffect(() => {
//         //hasRun.current = false;
//         if (!hasRun.current) {
            
//             document.addEventListener("d3Data", handleD3Data);
//             console_monkey_patch();
//             hasRun.current = true;
//             //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
//                 //init canvas
//                 const canvas = document.getElementById('roll');
//                 canvas.width = canvas.width * 2;
//                 canvas.height = canvas.height * 2;
//                 const drawContext = canvas.getContext('2d');
//                 const drawTime = [-2, 2]; // time window of drawn haps
//                 globalEditor = new StrudelMirror({
//                     defaultOutput: webaudioOutput,
//                     getTime: () => getAudioContext().currentTime,
//                     transpiler,
//                     root: document.getElementById('editor'),
//                     drawTime,
//                     onDraw: (haps, time) => 
//                         drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
//                     prebake: async () => {
//                         initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
//                         const loadModules = evalScope(
//                             import('@strudel/core'),
//                             import('@strudel/draw'),
//                             import('@strudel/mini'),
//                             import('@strudel/tonal'),
//                             import('@strudel/webaudio'),
//                         );
//                         await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
//                     },
//                 });
            
//             globalEditor.setCode(songText);
//             strudelRef.current = globalEditor;
            
                
//             document.getElementById('proc').value = stranger_tune;
//             //SetupButtons()
//             //Proc()/
//         }
        
//         //globalEditor.setCode(songText);
//     }, []); // empty on initial load

//     // second useEffect should handle changes, since first is mount
//     useEffect(() => {
//         if (strudelRef.current) {
//             strudelRef.current.setCode(songText);
//         }
//     }, [songText]) // these are accessible

// }

export default StrudelPlayer;