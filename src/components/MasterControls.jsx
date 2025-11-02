function MasterControls({ cycleData }) {
    return (
        <>
            <div className="input-group mb-3">
                <div className="input-group-prepstart">
                    <span className="input-group-text" id="cpm-label">Set {cycleData.isPerMinute ? "CPM" : "CPS"}</span>
                </div>
                <input type="text" className="form-control" id="cpm-text-input" placeholder={cycleData.text} aria-label="cpm" aria-describedby="cpm-label" />
                <div className="input-group-prepend">
                    <span className="input-group-text" id="cpm-label">{cycleData.isPerMinute ? "CPM" : "CPS"} = {Math.round(cycleData.value * 100)/100}</span>
                </div>
            </div>

            <label htmlFor="volume-range" className="form-label">Master Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume-range"/>
        </>
    );
}

export default MasterControls;