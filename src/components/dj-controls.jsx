import InstrumentControls from "./instrument-controls";

function DJControls() {
    return (
        <>
            <div className="form-check form-switch">
                <label class="form-check-label" for="instrumentSwitch">p1</label>
                <input class="form-check-input" type="checkbox" role="switch" id="instrumentSwitch" />
            </div>

            <InstrumentControls/>
        </>
    );
}

export default DJControls;