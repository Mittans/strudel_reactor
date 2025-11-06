function DJ_Controls({ volume, onVolumeChange }) {
    return (
        //cpm input
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">SetCPM</span>

                <input type="text" className="form-control" id="cpm_label_text" placeholder="CPM" aria-label="CPM" aria-describedby="cpm_label" />
            </div>
            {/*volume slider*/}
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.1" onMouseUp={onVolumeChange} id="volume_range" />

            {/* mute options */}
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="bassline" />
                <label className="form-check-label" htmlFor="bassline">
                    bassline
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="mainArp" />
                <label className="form-check-label" htmlFor="mainArp">
                    main arp
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="drums1" />
                <label className="form-check-label" htmlFor="drums1">
                    drums 1
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="drums2" />
                <label className="form-check-label" htmlFor="drums2">
                    drums 2
                </label>
            </div>
        </>
    );
}

export default DJ_Controls;