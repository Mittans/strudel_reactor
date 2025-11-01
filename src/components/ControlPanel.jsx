import DJControls from './dj_controls/DJControls';
//import { handlePlay, handleStop } from '../App.js';

let djSettingsString = "";

const handleGetDJSettings = () => {
    console.log("returning : " + djSettingsString);
    return djSettingsString;
}

const handleSetDJSettings = (variable) => {
    console.log("received : " + variable);
    djSettingsString += variable;
    console.log("thus, DJSettings with handleDJSettings : " + djSettingsString);
}

// function handleGetDJSettings() {
//     console.log("returning : " + djSettingsString);
//     return djSettingsString;
// }

// function handleSetDJSettings(variable) {
//     console.log("variable received : " + variable);
//     djSettingsString += variable;
//     console.log("thus, DJSettings with handleDJSettings : " + djSettingsString);
// }

// works but it doesn't save state when switching from control and back again :(
function ControlPanel({ volume, setVolume, cpm, setCPM, onHandleChangeRequest, onUpdate }) {

    // this should not download everything... right?
    // i mean... it could be one big JSON with each line as an element? lol
    function exportJSON() {
        console.log("exportJSON() called");
        let docString = document.getElementById('proc').value;
        alert(docString); //this needs to write to a file or smth, and then download
        console.log("here in exportJSON, handleGetDJSettings : " + handleGetDJSettings());
    }

    function importJSON() {
        console.log("importJSON() called");
    }

    return (
        <>
            <div className="" role="group" id="menuPanelStuff1" aria-label="Control panel">
                <div className="" id="menuPanel">
                    <div className="btn-group btn-light" role="group" id="menuBtns" aria-label="Menu buttons">
                        <button href="#" id="exportJSON" className="btn" onClick={(e) => {
                            exportJSON();
                        }}>Export JSON</button>
                        <button className="btn" id="importJSON" onClick={(e) => {
                            importJSON();
                        }}>Import JSON</button>

                    </div>
                    <br /><br />
                </div>
                <div className="" id="unnamedPanel" >
                    {/* need code for changing volume, cpm, etc */}
                    {/* <DJControls 
                        volume={volume}
                        setVolume={setVolume}
                        cpm={cpm}
                        setCPM={setCPM}
                        onUpdate={onUpdate}
                        onHandleChangeRequest={onHandleChangeRequest}

                        // volume={volume}
                        // setVolume={setVolume}
                        // cpm={cpm}
                        // setCPM={setCPM}
                        // onUpdate={(e) => {
                        //     console.log("DJControls onCLick behaviour triggered for JSX.Element in ControlPanel");
                        // }}
                    /> */}
                    
                </div>
            </div>
        </>
    )
}

export default ControlPanel;