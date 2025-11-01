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
import { handlePlay, handleStop, handleProc, handleProcPlay, handleReset, Proc } from './StrudelSetup';
import userEvent from "@testing-library/user-event";

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
function StrudelPlayer() {
    //TODO: fix the fact that proc&play can play multiple overlapping strudels, lol

    //let strudelRef = useRef();
    const hasRun = useRef(false);
    const [ songText, setSongText ] = useState("");
    const [ volume, setVolume ] = useState(0.5);
    const [ cpm, setCPM ] = useState(120);

    // on load the player needs to setup the strudel
    useEffect(() => {
        console.log("StrudelPlayer useEffect called");

        if (!hasRun.current) {
            console.log("hasRun is false; setting up Strudel");
            hasRun.current = true;
            StrudelSetup(stranger_tune, setSongText);
        }
    }, []);

    // handles setting changes
    useEffect((e) => {
        console.log("second useEffect in StrudelPlayer called - " + e);
    });

    const [ showErrText, setShowErrText ] = useState(false) // for later use
    const [ activeBtn, setActiveBtn ] = useState("controlBtn")
    const [ settings, setSetting ] = useState()

    function handleThisChange(e) {
        console.log("Handling change - " + e);
    }

    function handleSettings(codeString) {
        console.log("handleSettings is being called in StrudelPlayer???");
        strudelRef.current.setCode(codeString);
    }

    const onHandleChangeRequest = (e) => {
        console.log("onHandleChangeRequest called in StrudelPlayer - " + e.target.value);
    }

    const handleVolumeChange = (e) => {
        console.log("handleVolume (DJControls.jsx) called");
        let newVolume = parseFloat(e.target.value); // if only we could initialise variables as a type line in other languages :(
        // does this need both?
        setVolume(newVolume); // DJControls state
        //setGlobalVolume(newVolume); // strudel player volume
    };

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
                                <PreprocessTextArea songText={songText} setSongText={setSongText}/>
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
                                {/* rather than selectively loading them, menu panel will just show and hide them respectively */}
                                <div className="HelpPanel" style={{ display: (activeBtn === "helpBtn") ? 'block' : 'none' }}>
                                    < HelpPanel />
                                </div>
                                <div className="ControlPanel" style={{ display: (activeBtn === "controlBtn") ? 'block' : 'none' }}>
                                    < ControlPanel 
                                        volume={volume}
                                        setVolume={setVolume}
                                        cpm={cpm}
                                        setCPM={setCPM}
                                        onUpdate={handleThisChange}
                                        onHandleChangeRequest={onHandleChangeRequest}
                                    />
                                </div>
                                <div className="ConsolePanel" style={{ display: (activeBtn === "consoleBtn") ? 'block' : 'none' }}>
                                    < ConsolePanel />
                                </div>
                                {/* this is essentially a big if-if-if rn */}
                                {/* { (activeBtn === "helpBtn") ? < HelpPanel /> : null }
                                { (activeBtn === "controlBtn") ? < ControlPanel 
                                    volume={volume}
                                    setVolume={setVolume}
                                    cpm={cpm}
                                    setCPM={setCPM}
                                    onUpdate={handleThisChange}
                                    onHandleChangeRequest={onHandleChangeRequest}
                                /> : null }
                                { (activeBtn === "consoleBtn") ? < ConsolePanel /> : null } */}
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

export default StrudelPlayer;