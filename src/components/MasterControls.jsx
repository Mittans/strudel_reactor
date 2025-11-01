function MasterControls() {
    return (
        <>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="cpm-label">Set CPM</span>
                </div>
                <input type="text" className="form-control" id="cpm-text-input" placeholder="120" aria-label="cpm" aria-describedby="cpm-label" />
            </div>
            <label htmlFor="volume-range" className="form-label">Master Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume-range"/>
        </>
    );
}

export default MasterControls;