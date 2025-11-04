import { useState, useEffect } from 'react';
function DJControls({ onCpmChange, cpm, onKeyShiftChange, keyShift }) {
    // State variable to store the current CPM value
    const [localCpm, setLocalCpm] = useState(cpm ?? 140);
    // State variable to store the current Key shitf value
    const [localShift, setLocalShift] = useState(keyShift ?? 0);

    //  Sync the local CPM value
    useEffect(() => {
        if (typeof cpm === 'number' && !Number.isNaN(cpm)) {
            setLocalCpm(cpm);
        }
    }, [cpm]);

    useEffect(() => {
        if (typeof keyShift === 'number' && !Number.isNaN(keyShift)) {
            setLocalShift(keyShift);
        }
    }, [keyShift]);

    const handleCpmChange = (e) => {
        let value = e.target.valueAsNumber;
        if (Number.isNaN(value)) value = 140;
        value = Math.min(300, Math.max(1, value));

        setLocalCpm(value);
        onCpmChange?.(value);
    };

    const handleKeyShiftChange = (e) => {
        let value = e.target.valueAsNumber;
        if (Number.isNaN(value)) value = 0;
        value = Math.min(24, Math.max(-24, value));

        setLocalShift(value);
        onKeyShiftChange?.(value);

    };

    const quickCpms = [30, 60, 90, 120, 140];
    const cpmStyles = {
        30: 'btn-outline-secondary',
        60: 'btn-outline-info',
        90: 'btn-outline-success',
        120: 'btn-outline-warning',
        140: 'btn-outline-danger',
    };

    const quickKeys = [-24, -12, -6, 0, 6, 12, 24];
    const keyStyles = {
        [-24]: 'btn-outline-danger',
        [-12]: 'btn-outline-warning',
        [-6]: 'btn-outline-info',
        [0]: 'btn-outline-secondary',
        [6]: 'btn-outline-success',
        [12]: 'btn-outline-info',
        [24]: 'btn-outline-primary',
    };

    const handleQuickCpm = (value) => {
        setLocalCpm(value);
        if (typeof onCpmChange === "function") onCpmChange(value);
    };

    const handleQuickShift = (value) => {
        setLocalShift(value);
        if (typeof onKeyShiftChange === "function") onKeyShiftChange(value);
    };

    return (
        <>
            <hr className="my-3" />
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="number" className="form-control" id="cpm_text_input" value={cpm} onChange={handleCpmChange} min="1"  max="300" step="1" />
                {/*<input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="Username" aria-describedby="cpm_label" />*/}
            </div>

            {/* Button for quick change cpm */}
            <div className="btn-group mb-3 w-100" role="group" aria-label="Quick CPM Buttons">
                {quickCpms.map((val) => (
                    <button key={val} type="button" className={`btn ${cpmStyles[val]} ${localCpm === val ? 'active' : ''} btn-sm`} onClick={() => handleQuickCpm(val)} >
                        {val}
                    </button>
                ))}
            </div>

            {/* Volume */}
            <hr className="my-3" />
            <div className="input-group mb-3">
                <label htmlFor="volume_range" className="form-label">Volume</label>
                <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" />
            </div>

            {/* CheckBox for select instruments */}
            <hr className="my-3" />
            <div className="input-group mb-3">
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
            </div>

            {/* Key shifter */}
            <hr className="my-3" />
            <h6>Key Shift</h6>

            <div className="input-group mb-3">
                <span className="input-group-text">Semitones</span>
                <input type="number" className="form-control" id="key_shift_input" value={localShift} onChange={handleKeyShiftChange} placeholder="0" min="-12" max="12" step="1" />
            </div>

            {/* Button for quick change cpm */}
            <div className="btn-group mb-3 w-100" role="group" aria-label="Quick Key Buttons">
                {quickKeys.map((val) => (
                    <button key={val} type="button" className={`btn ${keyStyles[val]} ${localShift === val ? 'active' : ''} btn-sm`} onClick={() => handleQuickShift(val)} >
                        {val > 0 ? `+${val}` : val}
                    </button>

                ))}
            </div>

      </>
  );
}

export default DJControls;