import setCycle from "../utils/setCycle";

function MasterControls({ cycleData, songText, setSongText, setCycle }) {
    return (
        <>
            <div className="input-group mb-3">
                <div className="input-group-prepstart">
                    <span className="input-group-text" id="cycle-label">Set {cycleData.isPerMinute ? "CPM" : "CPS"}</span>
                </div>
                <input type="text" className="form-control" id="cycle-text-input" placeholder="Insert cycle value here" aria-label="cycle" aria-describedby="cycle-label" value={cycleData.cycleText} onChange={(e) => setSongText(setCycle(songText, cycleData, e.target.value))} />
                <div className="input-group-prepend">
                    <span className="input-group-text" id="cycle-label">CPS = {!isNaN(cycleData.value) ? (Math.round(cycleData.value / (cycleData.isPerMinute ? 60 : 1) * 100) / 100) : "?"}</span>
                </div>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="cycle-label">CPM = {!isNaN(cycleData.value) ? (Math.round(cycleData.value * (cycleData.isPerMinute ? 1 : 60) * 100) / 100) : "?"}</span>
                </div>
            </div>

            <label htmlFor="volume-range" className="form-label">Master Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume-range"/>
        </>
    );
}

export default MasterControls;