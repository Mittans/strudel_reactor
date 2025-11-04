function basic_controls(defaultGainValue, onGainChange) {
    return (
        <>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    p1: ON
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    p1: HUSH
                </label>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>

                <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="cpm" aria-describedby="cpm_label" />

            </div>

            <label htmlFor="vol_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" defaultValue={defaultGainValue} onChange={onGainChange} id="vol_range"></input>

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