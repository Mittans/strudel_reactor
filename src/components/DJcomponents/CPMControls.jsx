function CpmControls({ cpm, localCpm, handleCpmChange, handleQuickCpm }) {

    const quickCpms = [30, 60, 90, 120, 140];
    const cpmStyles = {
        30: 'btn-outline-secondary',
        60: 'btn-outline-info',
        90: 'btn-outline-success',
        120: 'btn-outline-warning',
        140: 'btn-outline-danger',
    };

    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input type="number" className="form-control" id="cpm_text_input" value={cpm} onChange={handleCpmChange} min="1" max="300" step="1" />
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
        </>
    );
}

export default CpmControls;
