//import { useState } from "react";
//import { setGlobalVolume } from "./StrudelSetup";
import CPMInput from "./CPMInput"; // stupid error 
import VolumeSlider from "./VolumeSlider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


export function AudioControls({ volume, setVolume, cpm, setCPM, onHandleGeneric, onHandleVolume, onHandleCPM, theme}) {
    return (
        <>
            <div className="container audio-controls" onChange={onHandleGeneric}>
                <h6 className="mt-5 mb-4 audioControlHeading">Audio Controls</h6>
                <p className="mb-1">Cycles Per Minute</p>
                <CPMInput cpm={cpm} setCPM={setCPM} onHandleCPM={onHandleCPM} theme={theme} />
                <br/>
                <VolumeSlider volume={volume} setVolume={setVolume} onHandleVolume={onHandleVolume} theme={theme} />
                
            </div> {/* on update */}
        </>
    )
};

export default AudioControls;