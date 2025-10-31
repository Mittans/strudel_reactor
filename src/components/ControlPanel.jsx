import DJControls from './DJControls';
//import { handlePlay, handleStop } from '../App.js';

// through state?
// works but it doesn't save state when switching from control and back again :(
function ControlPanel({  }) {
    // this should not download everything... right?
    // i mean... it could be one big JSON with each line as an element? lol
    function exportJSON() {
        let docString = document.getElementById('proc').value;
        alert(docString); //this needs to write to a file or smth, and then download
        
        //json.dump(data_to_write, json_file, indent=4)
    }

    return (
        <>
            <div className="" role="group" id="menuPanelStuff1" aria-label="Control panel">
                <div className="" id="menuPanel">
                    <div className="btn-group btn-light" role="group" id="menuBtns" aria-label="Menu buttons">
                        <button href="#" id="link" className="btn" onClick={(e) => {
                            exportJSON();
                        }}>Export JSON</button>
                        <button className="btn" id="testBtn" onClick={(e) => console.log(e["target"].id)}>Import JSON</button>

                    </div>
                    <br /><br />
                </div>
                <div className="" id="unnamedPanel" >
                    {/* need code for changing volume, cpm, etc */}
                    <DJControls onUpdate={(e) => {
                        console.log("DJControls onCLick behaviour triggered for JSX.Element in ControlPanel");
                    }} />
                    
                </div>
            </div>
        </>
    )
}

export default ControlPanel;