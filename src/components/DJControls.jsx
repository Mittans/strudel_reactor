function DJControls( setVolume ) {
    let volume;
    return (


        <>
        <div className="input-group mb-3">
            <span className="input-group-text" id="cpm_label">SetCPM</span>
            <input type="text" className="form-control" id="cpm_text_input" placeholder="120" onChange={setVolume} aria-label="cpm" aria-describedby="cpm_label"/>
        </div>

        {/* TODO: this does nothing!
        * it should show a numerical display next to the bar (and it should also, you know, work!) 
        */}
        <label htmlFor="volume_range" className="form-label">Volume{volume}</label>
        <input type="range" className="form-range" min="0" max="1" step="0.01" value={volume} id="volume_range"/>

        {/* TODO: this does nothing! */}
        <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked /> {/*onChange={ProcAndPlay} */}
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    p1: ON
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"  /> {/*onChange={ProcAndPlay} */}
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    p1: HUSH
                </label>
            </div>

        </>
    )
}

export default DJControls;