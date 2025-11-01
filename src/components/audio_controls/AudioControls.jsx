//import { useState } from "react";
//import { setGlobalVolume } from "./StrudelSetup";
import CPMInput from "./CPMInput"; // stupid error 
import VolumeSlider from "./VolumeSlider";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


export function AudioControls({ volume, setVolume, cpm, setCPM, onHandleChangeRequest}) {
    return (
        <>
            <div className="container audio-controls" onChange={onHandleChangeRequest}>

                <CPMInput cpm={cpm} setCPM={setCPM} />

                <VolumeSlider volume={volume} setVolume={setVolume} />
                
            </div> {/* on update */}
        </>
    )
};

export default AudioControls;