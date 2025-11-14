import ToggleButton from "react-bootstrap/ToggleButton";

function VolumeControl({ Proc, MuteState, setMuteState, Volume }) {
    // Sets the state of Mute
    const MuteStateSetter = () => {
        setMuteState(!MuteState);
        Proc();
    };

    // Creates a range to change volume and a toggle button to mute.
    return (
        <div className="col-12 mb-3">
            <ToggleButton
                className="mb-2"
                variant={MuteState ? "primary" : "outline-primary"}
                onClick={MuteStateSetter}
            >
                {MuteState ? "UnMute" : "Mute"}
            </ToggleButton>

            <div>
                <label htmlFor="Volume" className="form-label">
                    Volume:
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="VolumeControl"
                    min={0}
                    max={1}
                    step={0.05}
                    onChange={(event) => Volume("AllTrackVolume", event.target.value)}
                ></input>
            </div>
        </div>
    );
}

export default VolumeControl;
