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

import AudioControls from './audio_controls/AudioControls';
import DJControls from './dj_controls/DJControls';
import MenuButtons from './menu_controls/MenuButtons';
import PlayButtons from './PlayButtons';
import ProcButtons from './ProcButtons';
import PreprocessTextArea from './PreprocessTextArea';
import ErrorTextArea from './ErrorTextArea';
import HelpPanel from './menu_controls/HelpPanel';
//import ControlPanel from './panels/ControlPanel';
import SourcePanel from './menu_controls/SourcePanel';
import ConsolePanel from './menu_controls/ConsolePanel';
import { setGlobalCPM, StrudelSetup } from './StrudelSetup';
import { handlePlay, handleStop, handleProc, handleProcPlay, handleReset, Proc, setGlobalVolume} from './StrudelSetup';
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
    const [ activeBtn, setActiveBtn ] = useState("controlBtn")
    const [ errorText, setErrorText ] = useState("");

    // audio_controls
    const [ volume, setVolume ] = useState(0.5);
    const [ cpm, setCPM ] = useState(120);

    // dj_controls
    const [ themeDropdown, setThemeDropdown] = useState("Dark"); // light is default for maximum effect
    const [ codeFontSize, setCodeFontSize ] = useState(14);

    // on load the player needs to setup the strudel
    useEffect((e) => {
        console.log("First useEffect in StrudelPlayer called");

        if (!hasRun.current) {
            console.log("hasRun is false; setting up Strudel");
            hasRun.current = true;
            StrudelSetup(stranger_tune, setSongText, volume, cpm);
        }
        setGlobalVolume(volume);
        setGlobalCPM(cpm);
    }, []);

    // handles setting changes
    useEffect((e) => {
        console.log("Second useEffect in StrudelPlayer called");
        document.getElementById("editor").style.cssText = `a:display: block; background-color: var(--background); font-size: `+codeFontSize+`px; font-family: monospace;`;
        
        //document.getElementById("proc").style = `resize: none; font-size: `+codeFontSize+`px;`;
        
    });

    const [ showErrText, setShowErrText ] = useState(false) // for later use
    const [ settings, setSetting ] = useState() // unused

    function handleThisChange(e) {
        console.log("Handling change - " + e);
    }
    
    // func being referenced from inside component function can't be a "function ..." it has to be a const
    const onHandleTheme = (e) => {
        console.log("Switched theme.");
        //setTheme((themeDropdown === "Light" ? "Dark" : "Light"));
    }

    function handleSettings(codeString) {
        console.log("handleSettings is being called in StrudelPlayer???");
        strudelRef.current.setCode(codeString);
    }

    function onHandleFontSize() {
        let padding = codeFontSize * 2;
        // font size
        document.getElementById("editor").style.cssText = `a:display: block; background-color: var(--background); font-size: `+codeFontSize+`px; font-family: monospace;`;
        //document.getElementById("proc").style.cssText = `resize: none; font-size: `+codeFontSize+`px;`+`paddingLeft:`+codeFontSize+`px;\``;
        document.getElementById("proc").style.cssText = `resize: none; font-size: `+codeFontSize+`px;`+`padding-left:`+padding+`px;`;
    }

    function handleResetCode() {
        setSongText(stranger_tune);
        setCodeFontSize(14);
        Proc();
    }

    function onHandleResetControls() {
        console.log("onHandleResetControls called");
        setCodeFontSize(14);
        setCPM(120);
        setVolume(0.5);
        setThemeDropdown("Dark");
        setGlobalVolume(0.5);
        setGlobalCPM(120);
        document.getElementById("checkbox_1").checked = document.getElementById("checkbox_1").defaultChecked;
        document.getElementById("checkbox_2").checked = document.getElementById("checkbox_2").defaultChecked;

    }

    // TODO: this is messy
    const onHandleGeneric = (e) => {
        let idString = e.target.id;
        // debug prints
        if (idString.startsWith("dropdown_")) {
            console.log("onHandleChangeRequest called in StrudelPlayer - " + e.target.id + " : " + document.getElementById(e.target.id).innerHTML);
        } else if (idString.startsWith("checkbox_")) {
            console.log("onHandleChangeRequest called in StrudelPlayer - " + e.target.id + " : " + e.target.checked);
        }  else {
            console.log("onHandleChangeRequest called in StrudelPlayer - " + e.target.id + " : " + e.target.value);
            if (idString.startsWith("volume")) {
                console.log("volume related change ");
            }
        }
    }

    const onHandleVolume = (e) => {
        console.log("handleVolume (DJControls.jsx) called");
        //document.getElementById("cm_line").setProperty('cm_line', `${10}px`);
        let newVolume = parseFloat(e.target.value); // if only we could initialise variables as a type line in other languages :(
        // does this need both?
        setVolume(newVolume); // DJControls state
        setGlobalVolume(newVolume); // strudel player volume
    };

    const onHandleCPM = (e) => {
        console.log("onHandleCPM (DJControls.jsx) called");
        let newCPM = parseFloat(e.target.value);
        setCPM(newCPM); // DJControls state
        setGlobalCPM(newCPM); // strudel player volume
    };

    function exportJSON() {
        console.log("exportJSON() called");
        let docString = document.getElementById('proc').value;
        alert(docString); //this needs to write to a file or smth, and then download
    }

    function importJSON() {
        console.log("importJSON() called");
    }

    return (
        <div className="bg-header" data-theme={themeDropdown}>
            <h2 className="container-fluid bg-header">
                <div className="row bg-header">
                    <b className="col bg-header" style={{ maxWidth:'85%' }}>Strudel Demo</b>
                    <div className="col-auto bg-header">
                        <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                        <ProcButtons onProc={handleProc} onProcPlay={handleProcPlay} onReset={handleReset} />
                    </div>
                </div>
            </h2>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8 main" id="leftPanel">
                            {/* <StrudelPlayer 
                                    songText={songText} 
                                    strudelRef={strudelRef} 
                            /> */}
                            <div className="unprocessedTextPanel" id="editorPanel" style={{ maxHeight: '50vh', overflowY: 'auto'}}>
                                {/* e knows where it is because it knows where it isn't.
                                ... not really, i'm assuming e just has a reference to self or smth */}
                                <PreprocessTextArea songText={songText} setSongText={setSongText} />
                            </div>
                            <div className="processedCodePanel" id="codePanel" style={{ 
                                maxHeight: '35vh',
                                overflowY: 'auto',
                                }}>
                                <div className="editor" id="editor"/>
                                <div className="output" id="output" />
                            </div>
                        </div>

                        <div className="col-md-4 bg-foreground">
                            {/* the nav menu for right panel -- should control whats in box below on page and be highlighted when active */}
                            <div className="menuNavBar row">
                                <MenuButtons theme={themeDropdown} defaultValue={activeBtn} onClick={(e) => {
                                    setActiveBtn(e)
                                    //console.log("activeBtn : " + e);
                                }}/>
                            </div>
                            <div className="rightPanel" id="rightPanel">
                                {/* rather than selectively loading them, menu panel will just show and hide them respectively */}
                                <div className="HelpPanel bg-foreground" style={{ display: (activeBtn === "helpBtn") ? 'block' : 'none' }}>
                                    < HelpPanel />
                                </div>
                                <div className="ControlPanel bg-foreground" id="rightPanel" style={{ display: (activeBtn === "controlBtn") ? 'block' : 'none' }}>
                                    {/* < ControlPanel 
                                        onUpdate={handleThisChange}
                                        onHandleGeneric={onHandleGeneric}
                                    /> */}
                                    <div className="importExportBtns mb-4" role="group" id="menuPanelStuff1" aria-label="Control panel">
                                        <div className="row" id="menuPanel">
                                            <div className="btn-group" role="group" id="" aria-label="Menu buttons">
                                                <button href="#" style={{ textAlign:'center', maxWidth:'25%' }} id="exportJSON" className="btn container ioBtnRow" onClick={(e) => {
                                                    //exportJSON();
                                                }}>Export JSON</button>
                                                <button className="btn container ioBtnRow" style={{ textAlign:'center', maxWidth:'25%' }} id="importJSON" onClick={(e) => {
                                                    //importJSON();
                                                }}>Import JSON</button>
                                                <div className="container ioBtnRow dontShow" disabled style={{ textAlign:'center', width:'5%' }} ></div>
                                                <button id="reset" className="btn container ioBtnRow" onClick={handleResetCode} style={{ textAlign:'center', maxWidth:'33%' }}>Restore Default</button>
                                            </div>
                                        </div>
                                    </div>
                                    < AudioControls
                                        volume={volume}
                                        setVolume={setVolume}
                                        cpm={cpm}
                                        setCPM={setCPM}

                                        onHandleGeneric={onHandleGeneric}
                                        onHandleVolume={onHandleVolume}
                                        onHandleCPM={onHandleCPM}
                                        theme={themeDropdown}
                                    />
                                    
                                    < DJControls
                                        codeFontSize={codeFontSize}
                                        setCodeFontSize={setCodeFontSize}
                                        themeDropdown={themeDropdown}
                                        setThemeDropdown={setThemeDropdown}

                                        onHandleGeneric={onHandleGeneric}
                                        onHandleTheme={onHandleTheme}
                                        onHandleFontSize={onHandleFontSize}
                                        onHandleResetControls={onHandleResetControls}
                                        theme={themeDropdown}
                                    />
                                </div>
                                <div className="ConsolePanel bg-foreground" style={{ display: (activeBtn === "consoleBtn") ? 'block' : 'none' }}>
                                    < ConsolePanel />
                                </div>
                                <div className="SourcePanel bg-foreground" style={{ display: (activeBtn === "sourceBtn") ? 'block' : 'none' }}>
                                    < SourcePanel />
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                {/* this should only appear when errors detected -- relies on a conditionals state to show */}
                < ErrorTextArea errorText={errorText} setErrorText={setErrorText} />
                {/* { showErrText ? < ErrorTextArea defaultValue={showErrText} /> : null } */}
                <canvas hidden id="roll"></canvas>
            </main >
        </div >
    );
}

export default StrudelPlayer;