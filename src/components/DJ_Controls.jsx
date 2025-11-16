function DJ_Controls({ onVolumeChange, onToggle, onSetCpm, cpmError }) {

    return (
        //cpm input
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">SetCPM</span>
                <input type="number" className="form-control" id="cpm_label_text" placeholder="CPM" aria-label="CPM" aria-describedby="cpm_label" onChange={onSetCpm} />
            </div>

            {cpmError && (
                <div className="alert alert-danger mt-2" role="alert">
                    Invalid CPM entered! Please enter a valid CPM.
                </div>
            )}

            {/*volume slider*/}
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.05" onMouseUp={onVolumeChange} id="volume_range" />

            {/* mute options */}
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="bassline" onChange={onToggle} />
                <label className="form-check-label" htmlFor="bassline">
                    bassline
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="main_arp" onChange={onToggle} />
                <label className="form-check-label" htmlFor="main_arp">
                    main arp
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="drums" onChange={onToggle} />
                <label className="form-check-label" htmlFor="drums">
                    drums 1
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="drums2" onChange={onToggle} />
                <label className="form-check-label" htmlFor="drums2">
                    drums 2
                </label>
            </div>
        </>
    );
}

export default DJ_Controls;
