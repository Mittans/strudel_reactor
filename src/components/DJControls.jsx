import { useState, useEffect } from 'react';
import { Dropdown } from 'bootstrap';
function DJControls({ onCpmChange, cpm, onKeyShiftChange, keyShift, volume, onVolumeChange, onToggleTrack, tracksEnabled, onEffectChange }) {
    // State variable to store the current CPM value
    const [localCpm, setLocalCpm] = useState(cpm ?? 140);
    // State variable to store the current Key shitf value
    const [localShift, setLocalShift] = useState(keyShift ?? 0);
    // State variable to store the current master volume
    const [localVolume, setLocalVolume] = useState(volume ?? 1);
    // Tracks Mute
    const muteBass = !tracksEnabled?.bass;
    const muteArp = !tracksEnabled?.arp;
    const muteDrums = !tracksEnabled?.drums;
    const muteDrums2 = !tracksEnabled?.drums2;
    // Effects State
    const [enableReverb, setEnableReverb] = useState(false);
    const [reverbAmount, setReverbAmount] = useState(0.3);

    const [enableDelay, setEnableDelay] = useState(false);
    const [delayAmount, setDelayAmount] = useState(0.15);

    const [enableDistortion, setEnableDistortion] = useState(false);
    const [distortionAmount, setDistortionAmount] = useState(0.2);

    const [enableLowPass, setEnableLowPass] = useState(false);
    const [lowPassFreq, setLowPassFreq] = useState(2000);

    const [enableHighPass, setEnableHighPass] = useState(false);
    const [highPassFreq, setHighPassFreq] = useState(500);

    const [enableChorus, setEnableChorus] = useState(false);
    const [chorusAmount, setChorusAmount] = useState(0.4);

    const [enableWow, setEnableWow] = useState(false);
    const [wowAmount, setWowAmount] = useState(2);
    // Master Effect control
    const [enableMasterFx, setEnableMasterFx] = useState(false);
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

    useEffect(() => {
        const dropdowns = document.querySelectorAll('[data-bs-toggle="dropdown"]');
        dropdowns.forEach((el) => new Dropdown(el));
    }, []);

    // Create Effect Chain
    useEffect(() => {
        let chainParts = [];

        // Strudel reverb = room(level)
        if (enableReverb) {
            chainParts.push(`room(${Number(reverbAmount).toFixed(2)})`);
        }

        // Strudel delay = delay(level)
        if (enableDelay) {
            chainParts.push(`delay(${Number(delayAmount).toFixed(2)})`);
            // optional:
            // chainParts.push(`delaytime(0.25)`);
            // chainParts.push(`delayfeedback(0.4)`);
        }

        // Strudel distortion = shape(amount)
        if (enableDistortion) {
            chainParts.push(`shape(${Number(distortionAmount).toFixed(2)})`);
        }

        // Strudel low-pass = cutoff(freq)
        if (enableLowPass) {
            chainParts.push(`cutoff(${Math.round(lowPassFreq)})`);
        }

        // Strudel high-pass = hcutoff(freq)
        if (enableHighPass) {
            chainParts.push(`hcutoff(${Math.round(highPassFreq)})`);
        }

        // Strudel chorus (approx) = pan(sine.range(-d, d))
        if (enableChorus) {
            chainParts.push(`pan(sine.range(-${Number(chorusAmount).toFixed(2)}, ${Number(chorusAmount).toFixed(2)}))`);
        }

        // Strudel wow (pitch wobble) = speed(sine.range(1-d, 1+d))
        if (enableWow) {
            const depth = Number(wowAmount) * 0.05;
            chainParts.push(`speed(sine.range(${1 - depth}, ${1 + depth}))`);
        }

        onEffectChange?.(chainParts.join('.'));
    }, [
        enableReverb, reverbAmount,
        enableDelay, delayAmount,
        enableDistortion, distortionAmount,
        enableLowPass, lowPassFreq,
        enableHighPass, highPassFreq,
        enableChorus, chorusAmount,
        enableWow, wowAmount
    ]);

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

    const handleVolumeChange = (e) => {
        const value = parseFloat(e.target.value);
        setLocalVolume(value);
        onVolumeChange?.(value);
    };

    const handleToggle = (trackName, checked) => {
        onToggleTrack?.(trackName, checked);
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

    const handleEnableReverb = (event) => setEnableReverb(event.target.checked);
    const handleReverbAmountChange = (event) => setReverbAmount(event.target.value);

    const handleEnableDelay = (event) => setEnableDelay(event.target.checked);
    const handleDelayAmountChange = (event) => setDelayAmount(event.target.value);

    const handleEnableDistortion = (event) => setEnableDistortion(event.target.checked);
    const handleDistortionAmountChange = (event) => setDistortionAmount(event.target.value);

    const handleEnableLowPass = (event) => setEnableLowPass(event.target.checked);
    const handleLowPassFreqChange = (event) => setLowPassFreq(event.target.value);

    const handleEnableHighPass = (event) => setEnableHighPass(event.target.checked);
    const handleHighPassFreqChange = (event) => setHighPassFreq(event.target.value);

    const handleEnableChorus = (event) => setEnableChorus(event.target.checked);
    const handleChorusAmountChange = (event) => setChorusAmount(event.target.value);

    const handleEnableWow = (event) => setEnableWow(event.target.checked);
    const handleWowAmountChange = (event) => setWowAmount(event.target.value);

    const handleMasterFxToggle = (event) => {
        const enabled = event.target.checked;
        setEnableMasterFx(enabled);
        setEnableReverb(enabled);
        setEnableDelay(enabled);
        setEnableDistortion(enabled);
        setEnableLowPass(enabled);
        setEnableHighPass(enabled);
        setEnableChorus(enabled);
        setEnableWow(enabled);
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
                <input type="range" className="form-range" min="0" max="2" step="0.01" value={localVolume}
                    onChange={handleVolumeChange} id="volume_range" />
            </div>

            {/* CheckBox for select instruments */}
            <hr className="my-3" />
            <h6>Instrument Tracks</h6>
            <div className="mb-3">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="s1" checked={!muteBass}
                        onChange={(e) => handleToggle("bass", e.target.checked)} />
                    <label className="form-check-label" htmlFor="s1">
                        Bassline
                        </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="a1" checked={!muteArp}
                        onChange={(e) => handleToggle("arp", e.target.checked)} />
                    <label className="form-check-label" htmlFor="a1">
                        Main Arp
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="d1" checked={!muteDrums}
                        onChange={(e) => handleToggle("drums", e.target.checked)} />
                    <label className="form-check-label" htmlFor="d1">
                        Drums
                        </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="d1" checked={!muteDrums2}
                        onChange={(e) => handleToggle("drums2", e.target.checked)} />
                    <label className="form-check-label" htmlFor="d2">
                        Drums 2
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

            {/* Effects Selector Card */}
            <hr className="my-3" />
            <div className="card mb-3">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <span className="fw-semibold">Effects</span>
                    <div className="form-check form-switch m-0">
                        <input className="form-check-input" type="checkbox" role="switch" id="fxMasterEnable" checked={enableMasterFx} onChange={handleMasterFxToggle} />
                        <label className="form-check-label small" htmlFor="fxMasterEnable">Master</label>
                    </div>
                </div>

                <div className="card-body">
                    {/* Reverb */}
                    <div className="mb-3">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxReverb" checked={enableReverb} onChange={handleEnableReverb}/>
                            <label className="form-check-label" htmlFor="fxReverb">Reverb</label>
                        </div>
                        {enableReverb && (
                            <input type="range" min="0" max="1" step="0.01" className="form-range mt-1" value={reverbAmount}  onChange={handleReverbAmountChange} />
                        )}
                    </div>

                    {/* Delay */}
                    <div className="mb-3">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxDelay" checked={enableDelay} onChange={handleEnableDelay} />
                            <label className="form-check-label" htmlFor="fxDelay"> Delay</label>
                        </div>
                        {enableDelay && (
                            <input type="range"  min="0" max="1" step="0.01" className="form-range mt-1" value={delayAmount} onChange={handleDelayAmountChange}/>
                        )}
                    </div>

                    {/* Distortion */}
                    <div className="mb-3">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxDistortion" checked={enableDistortion} onChange={handleEnableDistortion}/>
                            <label className="form-check-label" htmlFor="fxDistortion">Distortion</label>
                        </div>
                        {enableDistortion && (
                            <input type="range" min="0"  max="1" step="0.01" className="form-range mt-1" value={distortionAmount} onChange={handleDistortionAmountChange}/>
                        )}
                    </div>

                    {/* Low-pass Filter */}
                    <div className="mb-3">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxLowPass" checked={enableLowPass} onChange={handleEnableLowPass} />
                            <label className="form-check-label" htmlFor="fxLowPass">Low-pass Filter</label>
                        </div>
                        {enableLowPass && (
                            <input type="range"  min="200" max="8000" step="50"  className="form-range mt-1" value={lowPassFreq} onChange={handleLowPassFreqChange} />
                        )}
                    </div>

                    {/* High-pass Filter */}
                    <div className="mb-3">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxHighPass" checked={enableHighPass} onChange={handleEnableHighPass}/>
                            <label className="form-check-label" htmlFor="fxHighPass">High-pass Filter</label>
                        </div>
                        {enableHighPass && (
                            <input type="range" min="100"  max="3000" step="50" className="form-range mt-1" value={highPassFreq} onChange={handleHighPassFreqChange}/>
                        )}
                    </div>

                    {/* Chorus */}
                    <div className="mb-3">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxChorus" checked={enableChorus} onChange={handleEnableChorus}/>
                            <label className="form-check-label" htmlFor="fxChorus">Chorus</label>
                        </div>
                        {enableChorus && (
                            <input type="range" min="0" max="1" step="0.01" className="form-range mt-1" value={chorusAmount} onChange={handleChorusAmountChange}/>
                        )}
                    </div>

                    {/* WOW */}
                    <div className="mb-1">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxWow" checked={enableWow} onChange={handleEnableWow}/>
                            <label className="form-check-label" htmlFor="fxWow">
                                WOW
                            </label>
                        </div>
                        {enableWow && (
                            <input type="range" min="0" max="10" step="0.1" className="form-range mt-1" value={wowAmount} onChange={handleWowAmountChange}/>
                        )}
                    </div>
                </div>
            </div>


            {/* User settings */}
            <hr className="my-3" />
            <div className="btn-toolbar mb-3" role="toolbar" aria-label="Music Style Toolbar">

                <div className="btn-group me-2" role="group" aria-label="Pop Style">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Pop
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>

                <div className="btn-group me-2" role="group" aria-label="Jazz Style">
                    <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Jazz
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>

                <div className="btn-group me-2" role="group" aria-label="Electronic Style">
                    <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Elec
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>
                

                <div className="btn-group me-2" role="group" aria-label="Classic Style">
                    <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Classic
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>
                <div className="btn-group me-2" role="group" aria-label="Rock Style">
                    <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Rock
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>


                <div className="btn-group me-2" role="group" aria-label="Custome Style">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Custome
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>


            </div>

      </>
  );
}

export default DJControls;