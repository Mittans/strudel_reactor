function DJControls() {
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
                />
            </div>

            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input
                type="range"
                className="form-range"
                min="0"
                max="1"
                step="0.01"
                id="volume_range"
            />
        </>
    );
}

export default DJControls;
