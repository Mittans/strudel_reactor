import "./DJControls.css";

// DJcontrols component manages the s1, d1, d2 instruments, volume and instrument intensity,
// echo feature, cpm, and JSON Feature(SAVE AND LOAD), it has sliders, checkboxes and textareas used to make things useable.
function DJControls({ s1, setS1, d1, setD1, d2, setD2, onProcess, setCpm, cpm, setVolume, volume, sets1Vol, setd1Vol, setd2Vol, s1Vol, d1Vol, d2Vol, setJsonText, jsonText, echo, setEcho }) {

    // This function simply sets the current value(true/false) to the instrument on/off which then is converted in app.js to "_" or " ".
    const handleToggle = (setter, currentValue) => {
        setter(!currentValue);
    };

    // This function manages the volume/intensity of things, setter property decides which volume is being controlled
    const handleVolume = (newVolume, setter) => {
        setter(newVolume);
    }


    // This function uses stringify from JSON to convert all the data we have from our controls variable to JSON.
    const saveJSON = () => {
        const data = { cpm, volume, s1, d1, d2, s1Vol, d1Vol, d2Vol, echo };
        setJsonText(JSON.stringify(data, null, 2));
    }

    // This function uses JSON.parse() to use the data saved/inputted in the text area and applies it to all the controls.
    // Because of this function we can use the saved data or enter data for multiple controls and apply it all at once.
    const loadJSON = () => {
        try {
            const data = JSON.parse(jsonText);

            if (data.cpm !== undefined) setCpm(data.cpm);
            if (data.volume !== undefined) setVolume(data.volume);
            if (data.s1 !== undefined) setS1(data.s1);
            if (data.d1 !== undefined) setD1(data.d1);
            if (data.d2 !== undefined) setD2(data.d2);
            if (data.s1Vol !== undefined) sets1Vol(data.s1Vol);
            if (data.d1Vol !== undefined) setd1Vol(data.d1Vol);
            if (data.d2Vol !== undefined) setd2Vol(data.d2Vol);
            if (data.echo !== undefined) setEcho(data.echo);
        } catch (err) {
            alert("Invalid JSON!");
        }
    }

    return (
        <>
           
            <div className="row container text-center">
                <div className="col-8">
                
                <div className="row">
                    <div className="col">
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="cpm_label">cpm</span>
                            <input type="text" className="form-control" id="cpm_text_input" placeholder="120" value={cpm} aria-label="cpm" aria-describedby="cpm_label" onChange={(e) => { setCpm(e.target.value); onProcess(); }} disabled />
                            <input type="range" className="form-range" min="100" max="160" step="1" id="volume_range" value={cpm} onChange={(e) => { setCpm(e.target.value); onProcess(); }} />
                        </div>
                    </div>
                    <div className="col">
                        <span className="input-group-text" id="volume_label">Main Volume</span>
                        <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" value={volume} onChange={(e) => setVolume(e.target.value, "mVol")} />
                    </div>
                    <div className="col">
                            <span className="input-group-text" id="echo">Echo</span>
                            <input type="range" className="form-range" min="0" max="1" step="0.01" id="echo" value={echo} onChange={(e) => { setEcho(e.target.value); onProcess(); }} />
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col d-flex flex-column align-items-center">
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="s1" checked={s1} onChange={() => handleToggle(setS1, s1)} />
                            <label className="form-check-label fs-2" htmlFor="s1">
                                🎹
                            </label>
                        </div>
                        <input type="range" className="form-range vertical-slider" min="1" max="500" step="10" value={s1Vol} onChange={(e) => handleVolume(e.target.value, sets1Vol)} />
                    </div>

                    <div className="col d-flex flex-column align-items-center">
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="d1" checked={d1} onChange={() => handleToggle(setD1, d1)} />
                            <label className="form-check-label fs-2" htmlFor="d1">
                                🥁
                            </label>
                        </div>
                        <input type="range" className="form-range vertical-slider" min="0" max="1" step="0.01" value={d1Vol} onChange={(e) => handleVolume(e.target.value, setd1Vol)} />
                    </div>

                    <div className="col d-flex flex-column align-items-center">
                        <div className="form-check mb-2">
                            <input className="form-check-input" type="checkbox" id="d2" checked={d2} onChange={() => handleToggle(setD2, d2)} />
                            <label className="form-check-label fs-2" htmlFor="d2">
                                🥁
                            </label>
                        </div>
                        <input type="range" className="form-range vertical-slider" min="0" max="1" step="0.01" value={d2Vol} onChange={(e) => handleVolume(e.target.value, setd2Vol)} />
                    </div>
                    
                </div>
                </div>
                <div className="card col-3 ms-5">
                    <h6 className="text-center">Settings</h6>
                    <div className="row mt-1">
                        <div className="col">
                            {/*<span className="input-group-text">Coming Soon</span>*/}
                            <button className="btn btn-primary w-100" onClick={saveJSON}>
                                Save Config
                            </button>
                        </div>
                        <div className="col">
                            {/*<span className="input-group-text">Coming Soon</span>*/}
                            <button className="btn btn-danger w-100" onClick={loadJSON}>
                                Load JSON
                            </button>
                        </div>
                    </div>
                
                    <div className="row card-body">
                        <textarea className="form-control" id="settings" rows="6" placeholder="JSON will appear here..." value={jsonText} onChange={(e) => setJsonText(e.target.value)} ></textarea>
                    </div>
                </div>

                
            </div>

        </>
    );
}

export default DJControls;