import { useState } from "react";
import { createRoot } from 'react-dom/client';
import console_monkey_patch from '../console-monkey-patch';

function updateProcSetting(changeData){
    console.log(changeData["data"]);
    let targetId = changeData["data"]["targetId"];
    let oldValue = changeData["data"]["oldValue"];
    let newValue = changeData["data"]["newValue"];

    // this is gonna get very long if not improved
    let codeString = document.getElementById('proc').value;
    switch(targetId) {
        case "cpm_text_input":
            console.log("match1" + targetId + "oldValue : " + oldValue + " | " + "newValue : " + newValue);
            codeString = codeString.replace(`setcpm(CPM`, `setcpm(${newValue}`);
            codeString = codeString.replace(`setcpm(${oldValue}`, `setcpm(${newValue}`);
            break;
        case "volume_range":
            console.log("match2" + targetId + "oldValue : " + oldValue + " | " + "newValue : " + newValue);
            codeString = codeString.replace(`all(x => x.gain(VOLUME)`, `all(x => x.gain(${newValue})`);
            codeString = codeString.replace(`all(x => x.gain(${oldValue}`, `all(x => x.gain(${newValue}`);
            break;
        default:
            console.log("oi : " + String(targetId));
            break;
    }
    document.getElementById("proc").value = codeString;
    /*
    let codeString = document.getElementById('proc').value;
    console.log("codeString : " + (codeString = codeString.replace("CPM", `${cpm}`)));
    codeString = codeString.replace(`setCPM(${codeString.}`, `${volume}`)
    codeString = codeString.replace("CPM", `${cpm}`)
    console.log("codeString : " + codeString);
    document.getElementById("proc").value = codeString;
    */
}

export function DJControls({ jsonSettings }) {
    //let VOLUME = document.getElementById('volume_range').value;
    /* not only does this need to update, and actually change the code,
     * it also needs to be saved in JSON format
     *
     * i'm thinking... I use this to save to JSON, and then call an updateSettings which then quickly
     * reads the changes in the JSON to then apply to the actual text/code? might work.
     * or just try and use states from React
     */

    const [ volume, setVolume ] = useState(0.5);
    const [ cpm, setCPM ] = useState(120);
    
    {/* how do i get volume and CPM to change?? */}
    
    //document.getElementById('proc').value.replace("VOLUME", `${volume}`);
    //document.getElementById('proc').value.replace("CPM", `${cpm}`);

    return (
        <>
            <div className="" onChange={(e) => console.log("should update - " + e["target"].id + " : " + (e.target.value))}>
                <div className="input-group mb-3">
                    <span className="input-group-text" id="cpm_label" >SetCPM</span>
                    
                    <input type="number" className="form-control" id="cpm_text_input" placeholder="120" min="0" defaultValue="120" 
                    aria-label="cpm" aria-describedby="cpm_label" value={cpm} onChange={(e) => { 
                        setCPM(e.target.value);
                        let targetId = e.target.id;
                        let oldValue = cpm;
                        let newValue = e.target.value;
                        newValue = parseInt(newValue)
                        updateProcSetting({ data:{targetId, oldValue, newValue} });
                    }}/>
                </div>

                {/* TODO: this does nothing!
                * it should show a numerical display next to the bar (and it should also, you know, work!) 
                */}
                <label htmlFor="volume_range" className="form-label">
                    <div className="row">
                        <div className="col">Volume</div>
                        <div className="col">{(volume*100).toFixed(0)}%</div>
                    </div>
                </label>
                <input type="range" className="form-range" min="0" max="1" value={volume} step="0.01" defaultValue="0.5" id="volume_range" 
                onChange={(e) => { 
                    setVolume(e.target.value);
                    let targetId = e.target.id;
                    let oldValue = (volume*100).toFixed(0)/100;
                    let newValue = (parseFloat(e.target.value)*100).toFixed(0)/100;
                    updateProcSetting({ data:{targetId, oldValue, newValue} });
                }}/>
                
                <p>aaaa</p>
                {/* TODO: this does nothing! */}
                <div className="form-check">
                    <input className="form-check-input" type="checkBox" name="aa" value="" id="checkBox1" defaultChecked /> {/*onChange={ProcAndPlay} */}
                    <label className="form-check-label" htmlFor="checkBox1">
                        check1: a {/* p1 ON */}
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkBox" name="bb" value="" id="checkBox2"  /> {/*onChange={ProcAndPlay} */}
                    <label className="form-check-label" htmlFor="checkBox2">
                        check2: a {/* p1 HUSH */}
                    </label>
                </div>
            </div>
        </>
    )
};

export default DJControls;