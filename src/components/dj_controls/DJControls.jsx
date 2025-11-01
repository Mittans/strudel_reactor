import { useState } from "react";
import { setGlobalVolume } from "../StrudelSetup";
import ThemDropdown, { default as FirstDropdown } from "./ThemeDropdown";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CodeFontSizeSlider from "./CodeFontSizeSlider";

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

// this handles controls for the editor (i.e., fontsize or whatever i do here)
export function DJControls({ codeFontSize, setCodeFontSize, themeDropdown, setThemeDropdown, onHandleGeneric, onHandleTheme, onHandleFontSize }) {
    /* figure out how to save these settings both into a JSON and when swapping between menus
     *
     */
    
    

    // if an element doesn't use "onChange", use its on(...) to invoke this
    // separated into multiple
    // function dropdown1, setDropdown1(e) {
    //     console.log("change detected : " + e);
    //     return e;
    //     //setDJSettings("a");
    // };

    // const handleVolumeChange = (e) => {
    //     console.log("handleVolume (DJControls.jsx) called");
    //     let newVolume = parseFloat(e.target.value); // if only we could initialise variables as a type line in other languages :(
    //     // does this need both?
    //     setVolume(newVolume); // DJControls state
    //     setGlobalVolume(newVolume); // strudel player volume
    // };

    return (
        <>
            <div className="container dj-controls" onChange={onHandleGeneric}>
                {/* change this out for component files (maybe just 1 dropdown thats reused repeatedly, for example) */}
                <div className="row mb-4">
                    {/* TODO: this does nothing! */}
                <div className="col">
                    <input className="form-check-input" type="checkBox" name="aa" value="" defaultChecked id="checkbox_1" onClick={(e) => {
                        // something
                    }} onChange={onHandleGeneric} /> {/*onChange={ProcAndPlay} */}
                    <label className="form-check-label" htmlFor="checkbox_1">
                        check1: a {/* p1 ON */}
                    </label>
                </div>
                <div className="col">
                    <input className="form-check-input" type="checkBox" name="bb" value="" id="checkbox_2" onChange={onHandleGeneric} /> {/*onChange={ProcAndPlay} */}
                    <label className="form-check-label" htmlFor="checkbox_2">
                        check2: a {/* p1 HUSH */}
                    </label>
                </div>

                </div>

                <ThemDropdown themeDropdown={themeDropdown} setThemeDropdown={setThemeDropdown} onHandleGeneric={onHandleGeneric} onHandleTheme={onHandleTheme} />

                <CodeFontSizeSlider codeFontSize={codeFontSize} setCodeFontSize={setCodeFontSize} onHandleGeneric={onHandleGeneric} onHandleFontSize={onHandleFontSize} />
                
            </div> {/* on update */}
        </>
    )
};

export default DJControls;