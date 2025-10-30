import PlayButtons from './PlayButtons';
import ProcButtons from './ProcButtons';
import DJControls from './DJControls';
//import { handlePlay, handleStop } from '../App.js';
import globalEditor from '../App';

const handlePlay = () => {
    //setShowErrText(true);
    //console.log("eventDetail : " + eventDetail);
    globalEditor.evaluate() // evaluate == play? wacks
}
const handleStop = () => {
    globalEditor.stop()
}

// works but it doesn't save state when switching from control and back again :(
function ControlPanel({  }) {
    
    return (
        <>
            <div className="" role="group" id="menuPanelStuff1" aria-label="Control panel">
                <div className="" id="menuPanel">
                    <nav>
                        <ProcButtons />
                        <br />
                        <PlayButtons onPlay={handlePlay} onStop={handleStop} />
                    </nav>
                </div>
                <div className="" id="unnamedPanel" >
                    {/* need code for changing volume, cpm, etc */}
                    <DJControls />
                </div>
            </div>
        </>
    )
}

export default ControlPanel;