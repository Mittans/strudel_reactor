function DJControls({ volume, cpm, onCpmChange,
    onChange, bass, onBassChange,
    melody, onMelodyChange,
    guitar, onGuitarChange,
    drums1, onDrums1Change,
    drums2, onDrums2Change,
    onSave, onLoad}) {
    return (
        <>
            {/* --- CPM Input --- */}
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>
                <input
                    type="text"
                    className="form-control"
                    id="setCPMBox"
                    placeholder="Enter CPM (60 to 200)"
                    aria-label="cpm"
                    aria-describedby="cpm_label"
                    value={cpm}
                    onChange={onCpmChange}
                    min="60"
                    max="200"
                    step="1"
                />
            </div>

            {/* --- JSON Save and load Buttons --- */}
            <div className="json-buttons">
                <button onClick={onSave} className="btn btn-primary">Save Settings</button>
                <button onClick={onLoad} className="btn btn-secondary">Load Settings</button>
            </div>

            {/* --- Volume Slider --- */}
            <div className="volume-container">
                <label htmlFor="volume_range" className="form-label">Volume ({Math.round(volume * 100)}%)</label>
                <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" value={volume} onChange={onChange} />
            </div>

            {/* --- Toggle Buttons --- */}
            <div className="dj-toggles">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="drums1" checked={drums1} onChange={onDrums1Change} />
                    <label className="form-check-label" htmlFor="drums1"> Drums1</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="drums2" checked={drums2} onChange={onDrums2Change} />
                    <label className="form-check-label" htmlFor="drums2"> Drums2</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="bass" checked={bass} onChange={onBassChange} />
                    <label className="form-check-label" htmlFor="bass"> Bass</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="melody" checked={melody} onChange={onMelodyChange} />
                    <label className="form-check-label" htmlFor="melody"> Melody</label>
                </div>

                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="guitar" checked={guitar} onChange={onGuitarChange} />
                    <label className="form-check-label" htmlFor="guitar"> Guitar</label>
                </div>
            </div>
            
            
        </>
    );
}

export default DJControls;
