import { useState, useEffect } from 'react';
function DJControls({ onCpmChange, cpm }) {
    // State variable to store the current CPM value
    const [localCpm, setLocalCpm] = useState(cpm ?? 140);

    //  Sync the local CPM value
    useEffect(() => {
        if (typeof cpm === 'number' && !Number.isNaN(cpm)) {
            setLocalCpm(cpm);
        }
    }, [cpm]);

    const handleCpmChange = (e) => {
        let value = e.target.valueAsNumber;
        if (Number.isNaN(value)) value = 140;
        value = Math.min(300, Math.max(1, value));

        setLocalCpm(value);
        onCpmChange?.(value);
    };

    const quickCpms = [30, 60, 90, 120, 140];
    const handleQuickCpm = (value) => {
        setLocalCpm(value);
        if (typeof onCpmChange === "function") onCpmChange(value);
    };

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="number" className="form-control" id="cpm_text_input" value={cpm} onChange={handleCpmChange} min="30"  max="300" step="1" />
                {/*<input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="Username" aria-describedby="cpm_label" />*/}
            </div>

            {/* Button for quick change cpm */ }
            <div className="btn-group mb-3 w-100" role="group" aria-label="Quick CPM Buttons">
                {quickCpms.map((val) => (
                    <button key={val} type="button" className={`btn btn-outline-secondary ${localCpm === val ? 'active' : ''}`} onClick={() => handleQuickCpm(val)} >
                        {val}
                    </button>
                ))}
            </div>

            {/* Volume */}
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" />


            {/* CheckBox for select instruments */}
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
                <input className="form-check-input" type="checkbox" value="" id="d1" />
                <label className="form-check-label" htmlFor="d2">
                        d2
                    </label>
            </div>

            {/* Key shifter */}
            <hr className="my-3" />
            <h6>Key Shift</h6>

            <div className="input-group mb-3">
                <span className="input-group-text">Semitones</span>
                <input type="number" className="form-control" id="key_shift_input" placeholder="0" min="-12" max="12" step="1" />
                <button className="btn btn-outline-secondary" type="button" id="key_down_btn">
                    -1
                </button>
                <button className="btn btn-outline-secondary" type="button" id="key_up_btn">
                    +1
                </button>
            </div>

            <div className="form-text text-muted">
                Adjust pitch by semitones (e.g., -2 lowers key by 2; +3 raises key by 3)
            </div>
      </>
  );
}

export default DJControls;