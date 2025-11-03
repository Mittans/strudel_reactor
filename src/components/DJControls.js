function DJControls() {
    return (
        <>
        <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"  defaultChecked />
            <label className="form-check-label" htmlFor="flexRadioDefault1">
                p1: ON
            </label>
            </div>
        <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  />
            <label className="form-check-label" htmlFor="flexRadioDefault2">
                p1: HUSH
            </label>
            </div>

            <div className="mb-3">
                <label htmlFor="volume_slider" className="form-label">Volume</label>
                <input
                    type="range"
                    id="volume_slider"
                    className="form-range"
                    min="0"
                    max="1"
                    step="0.01"
                    defaultValue="0.8"
                    onInput={(e) => {
                        const val = Number(e.target.value).toFixed(2);
                        const el = document.getElementById('volume_value');
                        if (el) el.textContent = val;
                    }}
                />
                <small>Current: <span id="volume_value">0.80</span></small>
            </div>

            <div className="mb-3">
                <label htmlFor="cpm_input" className="form-label">Cycles per Minute (CPM)</label>
                <input
                    type="number"
                    id="cpm_input"
                    className="form-control"
                    min="10"
                    max="400"
                    step="1"
                    defaultValue="140"
                />
            </div>

            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="p2Radio" id="p2_on" defaultChecked />
                <label class="form-check-label" for="p2_on">p2: ON</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="p2Radio" id="p2_hush" />
                <label class="form-check-label" for="p2_hush">p2: Hush</label>
            </div>


            <div class="form-check form-check-inline ms-3">
                <input class="form-check-input" type="radio" name="p3Radio" id="p3_on" defaultChecked />
                <label class="form-check-label" for="p3_on">p3: On</label>
            </div>
            <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" name="p3Radio" id="p3_hush" />
                <label class="form-check-label" for="p3_hush">p3: Hush</label>
            </div>
        </>
);
}
export default DJControls;