//import { useState } from "react";
//import { setGlobalVolume } from "./StrudelSetup";
import CPMInput from "./CPMInput"; // stupid error 
import VolumeSlider from "./VolumeSlider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


export function AudioControls({ volume, setVolume, cpm, setCPM, onHandleGeneric, onHandleVolume}) {
    return (
        <>
            <div className="container audio-controls" onChange={onHandleGeneric}>
                <h6 className="mt-5 mb-4">Audio Controls</h6>
                <CPMInput cpm={cpm} setCPM={setCPM} />
                <br/>
                <VolumeSlider volume={volume} setVolume={setVolume} onHandleVolume={onHandleVolume} />
                
            </div> {/* on update */}
        </>
    )
};

export default AudioControls;