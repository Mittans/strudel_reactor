function KeyShiftControls({ localShift, handleKeyShiftChange, handleQuickShift }) {

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

    return (
        <>
            {/* Key shifter */}
            <hr className="my-3" />

            <div className="input-group mb-3">
                <span className="input-group-text">Semitones</span>
                <input type="number" className="form-control" id="key_shift_input" value={localShift} onChange={handleKeyShiftChange} placeholder="0" min="-12" max="12" step="1" />
            </div>

            {/* Button for quick change key */}
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

export default KeyShiftControls;
