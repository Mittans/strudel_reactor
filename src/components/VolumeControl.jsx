function VolumeControl({ ProcAndPlay }) {
    return (
        <div className="col-12 mb-3">
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    name="MuteSwitch"
                    id="MuteSwitch"
                    onChange={() => ProcAndPlay()}
                />
                <label className="form-check-label mb-3" htmlFor="MuteSwitch">
                    Mute
                </label>
            </div>
            <div>
                <label htmlFor="Volume" className="form-label">
                    Volume:
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="VolumeControl"
                    onChange={VolumeControl}
                ></input>
            </div>
        </div>
    );
}

export default VolumeControl;
