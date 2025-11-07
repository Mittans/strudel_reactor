function DJControls({ volume, onVolumeChange, bpm, onBpmChange, reverbOn, delayOn, underwaterOn, onToggleReverb, onToggleDelay, onToggleUnderwater }) {
    return (
        <>
            <div className="card p-3 shadow-sm">
                <div className="input-group mb-3">
                    <span className="input-group-text" id="basic-addon1">set BPM</span>
                    <input type="number" className="form-control" id="bpm_text_input" placeholder="120" aria-label="bpm" aria-describedby="bpm_label" value={bpm} onChange={onBpmChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="volume_range" className="form-label">Volume</label>
                    <input type="range" className="form-range" min="0" max="1" step="0.01" onMouseUp={onVolumeChange} id="volume_range" />
                </div>

                <div className="d-flex gap-3 flex-wrap">
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
                        <input className="form-check-input" type="checkbox" value="" id="d2" />
                        <label className="form-check-label" htmlFor="d2">
                            d2
                        </label>
                    </div>
                    
                </div>
                <br />

                <div className="mb-3">
                    <div className="btn-group" role="group" aria-label="Effects">
                        <button
                            type="button"
                            className={`btn btn-outline-danger ${reverbOn ? 'active' : ''}`}
                            onClick={onToggleReverb}
                        >
                            Reverb
                        </button>
                        <button
                            type="button"
                            className={`btn btn-outline-warning ${delayOn ? 'active' : ''}`}
                            onClick={onToggleDelay}
                        >
                            Delay
                        </button>
                        <button
                            type="button"
                            className={`btn btn-outline-success ${underwaterOn ? 'active' : ''}`}
                            onClick={onToggleUnderwater}
                        >
                            Underwater
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DJControls;