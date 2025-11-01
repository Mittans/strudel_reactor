import { useState } from "react";
import { setGlobalVolume } from "./StrudelSetup";
//import { setGlobalVolume } from "./StrudelPlayer";

//import { createRoot } from 'react-dom/client';
//import console_monkey_patch from '../console-monkey-patch';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

function updateProcSetting(changeData){
    //console.log(changeData["data"]);
    let targetId = changeData["data"]["targetId"].split("_")[0];
    let oldValue = changeData["data"]["oldValue"];
    let newValue = changeData["data"]["newValue"];

    let codeString = document.getElementById('proc').value;
    codeString.replace('NaN', "0");
    codeString = codeString.replace(`let ${targetId} = ${oldValue}`, `let ${targetId} = ${newValue}`);
    document.getElementById("proc").value = codeString;
}

export function DJControls({ djSettings, setDJSettings }) {
    /* figure out how to save these settings both into a JSON and when swapping between menus
     *
     */
    const [ volume, setVolume ] = useState(0.5);
    const [ cpm, setCPM ] = useState(120);
    const [ dropdown1, setDropdown1] = useState("dropdown1"); // placeholder

    // if an element doesn't use "onChange", use its on(...) to invoke this
    // separated into multiple
    function handleChange() {
        console.log("change detected");
        setDJSettings("a");
    };

    const handleVolumeChange = (e) => {
        console.log("handleVolume (DJControls.jsx) called");
        let newVolume = parseFloat(e.target.value); // if only we could initialise variables as a type line in other languages :(
        // does this need both?
        setVolume(newVolume); // DJControls state
        setGlobalVolume(newVolume); // strudel player volume
    };

    return (
        <>
            <div className="" onChange={(e) => {
                handleChange();
            }}>

                <div className="input-group mb-4">
                    <span className="input-group-text menu_label" id="cpm_label">CPM</span>
                    <input type="number" className="form-control" id="cpm_text_input" placeholder="120" min="0" defaultValue="120" 
                    aria-label="cpm" aria-describedby="cpm_label" value={cpm} onChange={(e) => { 
                        
                        let newValue = parseInt(e.target.value);
                        let oldValue = cpm;
                        if (isNaN(newValue) || newValue < 0) {
                            //e.target.newValue = 0; // Reset to 0 if invalid or negative
                            document.getElementById("cpm_text_input").value = 10; // setting text of above to specific dropdown item
                        }
                        setCPM(newValue);
                        let targetId = e.target.id;
                        updateProcSetting({ data:{targetId, oldValue, newValue} });
                    }}/>
                </div>

                <div className="input-group mb-4">
                    <span className="input-group-text menu_label" id="volume_label">Volume</span>
                    {/* if nothing additional is added, e is passed directly (think self and python functions) */}
                    <input type="range" className="form-control" min="0" max="1" value={volume} step="0.01" defaultValue="0.5" id="volume_range" onChange={handleVolumeChange}/>
                    <span className="input-group-text" id="volume_label" style={{ width: 70 }}>{(volume*100).toFixed(0)}%</span>
                </div>
                
                <div className="row mb-4">
                    {/* TODO: this does nothing! */}
                <div className="col">
                    <input className="form-check-input" type="checkBox" name="aa" value="" id="checkBox1" defaultChecked /> {/*onChange={ProcAndPlay} */}
                    <label className="form-check-label" htmlFor="checkBox1">
                        check1: a {/* p1 ON */}
                    </label>
                </div>
                <div className="col">
                    <input className="form-check-input" type="checkBox" name="bb" value="" id="checkBox2"  /> {/*onChange={ProcAndPlay} */}
                    <label className="form-check-label" htmlFor="checkBox2">
                        check2: a {/* p1 HUSH */}
                    </label>
                </div>

                </div>

                {/* replaced with list group; could reuse later */}
                <div className="btn-group input-group mb-4 flex-auto">
                    <span className="input-group-text menu_label" aria-expanded="false">Dropdown</span>
                    <button className="form-control" style={{ textAlign: "left" }} id="dropdown1" data-bs-toggle="dropdown">Option1</button>
                    <ul className="dropdown-menu" onClick={(e) => {
                        // because of how this is catching them all, this technically counts the dropdown box itself when expanded
                        if (e.target.id !== ""){
                            handleChange();
                            document.getElementById("dropdown1").innerHTML = e.target.innerHTML; // setting text of above to specific dropdown item
                            setDropdown1(e.target.id);
                            //console.log("selected : " + document.getElementById("dropdown1").innerHTML);
                        }
                    }}>
                        {/* <li><h6 class="dropdown-header">Dropdown explanation here</h6></li> */}
                        <li><button className="dropdown-item" id="dropdown1-1">Option1</button></li>
                        <li><button className="dropdown-item" id="dropdown1-2">Option2</button></li>
                    </ul>
                </div>
            
                
            </div> {/* on update */}
        </>
    )
};

export default DJControls;