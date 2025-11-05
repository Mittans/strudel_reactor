import './basic_controls.css'

function basic_controls({ volume, onVolumeChange }) {
    return (
        <>
            {/* set song speed to x/60/4 (converts cpm to bpm) */}
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setBPM</span>

                <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label" />

            </div>

            {/* FUNCTIONAL */}
            {/* Volume slider */}
            <label htmlFor="vol_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="2" step="0.1" onMouseUp={onVolumeChange} id="vol_range"></input>

            {/* Checkboxes to mute particular instruments */}
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="bassline" />
                <label className="form-check-label" htmlFor="bassline">
                    mute bassline
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="main_arp" />
                <label className="form-check-label" htmlFor="main_arp">
                    mute main_arp
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="drums" />
                <label className="form-check-label" htmlFor="drums">
                    mute drums
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="drums2" />
                <label className="form-check-label" htmlFor="drums2">
                    mute drums2
                </label>
            </div>

        </>
        
    )
}

export default basic_controls;