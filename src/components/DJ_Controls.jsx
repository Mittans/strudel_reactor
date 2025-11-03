function DJ_Controls() {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">SetCPM</span>

                <input type="text" className="form-control" id="cpm_label_text" placeholder="CPM" aria-label="CPM" aria-describedby="cpm_label" />

            </div>
            <label htmlfor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" />

            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="s1" />
                <label className="form-check-label" htmlfor="s1">
                    s1
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d1" />
                <label className="form-check-label" htmlfor="d1">
                    d1
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d2" />
                <label className="form-check-label" htmlfor="d2">
                    d2
                </label>
            </div>
        </>
    );
}

export default DJ_Controls;