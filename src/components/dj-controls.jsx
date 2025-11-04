import InstrumentControls from "./instrument-controls";
import './component-styling.css'

function DJControls() {
    return (
        <>
            <div className="form-check form-switch">
                <label class="form-check-label px-2" for="instrumentSwitch">p1</label>
                <input class="form-check-input form-switch bg-secondary border-dark" type="checkbox" role="switch" id="instrumentSwitch" />
            </div>

            <InstrumentControls/>
        </>
    );
}

export default DJControls;