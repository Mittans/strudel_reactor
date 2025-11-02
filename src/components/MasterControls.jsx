function MasterControls({ cycleData, songText, setSongText, setCycleValue, setCycleInterval }) {
    return (
        <>
            <div className="input-group mb-3">
                <div className="input-group-prepstart">
                    <button className="btn  btn-outline-primary input-group-text" id="cycle-label" onClick={(e) => setSongText(setCycleInterval(songText, cycleData))}>Set {cycleData.isPerMinute ? "CPM" : "CPS"} ↑↓</button>
                </div>
                <input type="text" className="form-control" id="cycle-text-input" placeholder="Insert cycle value here" aria-label="cycle" aria-describedby="cycle-label" value={cycleData.cycleText} onChange={(e) => setSongText(setCycleValue(songText, cycleData, e.target.value))} />
                <div className="input-group-prepend">
                    <span className="input-group-text" id="cycle-label">CPS = {!isNaN(cycleData.value) ? (Math.round(cycleData.value / (cycleData.isPerMinute ? 60 : 1) * 100) / 100) : "?"}</span>
                </div>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="cycle-label">CPM = {!isNaN(cycleData.value) ? (Math.round(cycleData.value * (cycleData.isPerMinute ? 1 : 60) * 100) / 100) : "?"}</span>
                </div>
            </div>

            {/* Removed incomplete component to merge into main*/}
            {/*<label htmlFor="volume-range" className="form-label">Master Volume</label>*/}
            {/*<input type="range" className="form-range" min="0" max="1" step="0.01" id="volume-range"/>*/}
        </>
    );
}

export default MasterControls;