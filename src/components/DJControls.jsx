function DJControls({volume, cpm, onCpmChange, onChange}) {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input
                    type="text"
                    className="form-control"
                    id="cpm_text_input"
                    placeholder="120"
                    aria-label="cpm"
                    aria-describedby="cpm_label"
                    value={cpm}
                    onChange={onCpmChange}
                />
            </div>

            <div className="volume-container">
                <label htmlFor="volume_range" className="form-label">Volume ({Math.round(volume * 100)}%)</label>
                <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" value={volume} onChange={onChange} />
            </div>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="s1" />
                <label className="form-check-label" htmlFor="s1">
                    s1
                </label>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d1" />
                <label className="form-check-label" htmlFor="d1">
                    d1
                </label>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d2" />
                <label className="form-check-label" htmlFor="d2">
                    d2
                </label>
            </div>

        </>
    );
}

export default DJControls;
