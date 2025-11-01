function VolumeControl({ Proc, MuteState, setMuteState, Volume }) {
    const MuteStateSetter = () => {
        setMuteState(!MuteState);
        Proc();
    };

    return (
        <div className="col-12 mb-3">
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    id="MuteSwitch"
                    switch={`${MuteState}`}
                    onChange={() => MuteStateSetter()}
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
