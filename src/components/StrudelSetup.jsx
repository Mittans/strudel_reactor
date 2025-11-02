import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../tunes';
import console_monkey_patch from '../console-monkey-patch';

let strudelEditor = null;
let bigVolume = null;
let bigCPM = null;

let isProccessed = false;

let volumeControlRef = null;

export const Proc = () => {
    console.log("Proc() triggered");
    isProccessed = true;
    let procText = document.getElementById("proc").value;
    if (!procText || !strudelEditor) {
        strudelEditor.setCode(stranger_tune);
        return;
    } else {
        let volumeToUse = parseFloat(bigVolume);
        let cpmToUse = parseInt(bigCPM);
        console.log("this is: " + (procText += "\n" + "setcpm("+cpmToUse/4+")" + "\n" + "all(x => x.gain("+volumeToUse+"));"));
        strudelEditor.setCode((procText += "\n" + "setcpm("+cpmToUse/4+")" + "\n" + "all(x => x.gain("+volumeToUse+"));"));
    }
};

export const StrudelSetup = async ( stranger_tune, setSongText) => {
    //const hasRun = useRef(false);
    //document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            //hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
                //init canvas
                const canvas = document.getElementById('roll');
                canvas.width = canvas.width * 2;
                canvas.height = canvas.height * 2;
                const drawContext = canvas.getContext('2d');
                const drawTime = [-2, 2]; // time window of drawn haps
                
                strudelEditor = new StrudelMirror({
                    defaultOutput: webaudioOutput,
                    getTime: () => getAudioContext().currentTime,
                    transpiler,
                    root: document.getElementById('editor'),
                    drawTime,
                    onDraw: (haps, time) => 
                        drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
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
            
            //strudelRef = globalEditor;
            
            //strudelEditor.setCode(document.getElementById('proc').value);
            //document.getElementById("proc").value = stranger_tune;
            setSongText(stranger_tune);
            
            //SetupButtons()
            Proc(); // welcome back, Proc()   lol
};

//export default StrudelSetup;

export const setGlobalVolume = (value) => {
    console.log("setting bigVolume to : " + parseFloat(value));
    bigVolume = value;
    // const ctx = getAudioContext();
    // if (!volumeControlRef) {
    //     volumeControlRef = ctx.createGain();
    //     volumeControlRef.connect(ctx.destination);
    // }
    // volumeControlRef.gain.value = value;
    // console.log("volumeControlRef : " + volumeControlRef);
    //const ctx = getAudioContext();
    // if (volumeControlRef){
    //     volumeControlRef = getAudioContext().createGain(); // volume based on gain, have to create it like so
    //     volumeControlRef.connect(getAudioContext().destination);
    //     volumeControlRef.gain.value = value;
    // } else {
    //     console.log("volumeControlRef : " + volumeControlRef);
    //     console.log("Failed condition checker in setGlobalVolume");
    // }

}

export const setGlobalCPM = (value) => {
    console.log("setting bigCPM to : " + parseInt(value));
    bigCPM = parseInt(value);
    // const ctx = getAudioContext();
    // if (!volumeControlRef) {
    //     volumeControlRef = ctx.createGain();
    //     volumeControlRef.connect(ctx.destination);
    // }
    // volumeControlRef.gain.value = value;
    // console.log("volumeControlRef : " + volumeControlRef);
    //const ctx = getAudioContext();
    // if (volumeControlRef){
    //     volumeControlRef = getAudioContext().createGain(); // volume based on gain, have to create it like so
    //     volumeControlRef.connect(getAudioContext().destination);
    //     volumeControlRef.gain.value = value;
    // } else {
    //     console.log("volumeControlRef : " + volumeControlRef);
    //     console.log("Failed condition checker in setGlobalVolume");
    // }

}

export const handlePlay = () => {
    if (strudelEditor) {
        strudelEditor.evaluate();
        if (volumeControlRef) {
            //console.log("Playing with volume : " + volumeControlRef.gain.value); // proving volume saved in state (will need to update controlPanel tho)
            let procText = document.getElementById("proc").value;
            let volumeToUse = parseFloat(bigVolume);
            let cpmToUse = parseInt(bigCPM);
            console.log("so it should be using : " + (procText += "\n" + "all(x => x.gain("+volumeToUse+"));"));
            strudelEditor.setCode((procText += "\n" + "setcpm("+cpmToUse/4+")" + "\n" + "all(x => x.gain("+volumeToUse+"));"));
            strudelEditor.evaluate();
            strudelEditor.setCode(procText);
        }
    } else {
        console.log("Failed condition checker in handlePlay");
    }
}

export const handleStop = () => {
    if (strudelEditor) {
        strudelEditor.stop();
    } else {
        console.log("Failed condition checker in handleStop");
    }
}

export const handleProc = () => {
    if (strudelEditor) {
        handleStop();
        //console.log("handleProc triggered");
        Proc();
    } else {
        console.log("Failed condition checker in handleProc");
    }
}

export const handleProcPlay = async () => {
    await initAudioOnFirstClick();
    
    console.log("Called handleProcPlay");
    if (strudelEditor) {
        handleStop();
        //console.log("handleProcPlay triggered");
        Proc();
        //strudelEditor.setCode(document.getElementById('proc').value);
        let procText = document.getElementById("proc").value;
        let volumeToUse = parseFloat(bigVolume);
        let cpmToUse = parseInt(bigCPM);
        console.log("working");
        console.log("so it should be using : " + (procText += "\n" + "all(x => x.gain("+volumeToUse+"));"));
        strudelEditor.setCode((procText += "\n" + "setcpm("+cpmToUse/4+")" + "\n" + "all(x => x.gain("+volumeToUse+"));"));
        strudelEditor.evaluate();
        strudelEditor.setCode(procText);
    } else {
        console.log("Failed condition checker in handleProcPlay");
    }
}

export const handleReset = () => {
    handleStop();
    strudelEditor.setCode(stranger_tune);
    console.log("handleReset triggered");
    // @TODO: this needs to reset settings, too! otherwise we're allowing for errors 
    //strudelRef.current.setCode(defaultTune);
}