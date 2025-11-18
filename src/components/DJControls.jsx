import { useState, useEffect } from 'react';
import { Dropdown } from 'bootstrap';
import CPMControls from "./DJcomponents/CPMControls";
import VolumeControls from "./DJcomponents/VolumeControls";
import TrackControls from "./DJcomponents/TrackControls";
import KeyShiftControls from "./DJcomponents/KeyShiftControls";
import EffectControls from "./DJcomponents/EffectControls";
import SettingsControls from "./DJcomponents/SettingsControls";
import D3Graph from "./D3Graph";
import D3GraphScope from "./D3GraphScope";
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
    }, [enableReverb, reverbAmount, enableDelay, delayAmount, enableDistortion, distortionAmount,
        enableLowPass, lowPassFreq, enableHighPass, highPassFreq, enableChorus, chorusAmount, enableWow, wowAmount]);

    useEffect(() => {
        const anyFxEnabled = enableReverb || enableDelay || enableDistortion || enableLowPass || enableHighPass || enableChorus || enableWow;

        // If any FX is enabled, master on automaticly
        if (anyFxEnabled && !enableMasterFx) {
            setEnableMasterFx(true);
        }
        // If all FX disabled, master off auto
        if (!anyFxEnabled && enableMasterFx) {
            setEnableMasterFx(false);
        }
    }, [enableReverb, enableDelay, enableDistortion, enableLowPass, enableHighPass, enableChorus, enableWow,enableMasterFx]);


    // All handle session
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
        setEnableMasterFx(enabled); setEnableReverb(enabled); setEnableDelay(enabled); setEnableDistortion(enabled);
        setEnableLowPass(enabled); setEnableHighPass(enabled); setEnableChorus(enabled); setEnableWow(enabled);
    };

    // Effect lists for simplify
    const effects = [
        { key: "reverb", label: "Reverb", enable: enableReverb, amount: reverbAmount, min: 0, max: 1, step: 0.01,
            onToggle: handleEnableReverb, onAmountChange: handleReverbAmountChange },
        {
            key: "delay", label: "Delay", enable: enableDelay, amount: delayAmount, min: 0, max: 1, step: 0.01,
            onToggle: handleEnableDelay, onAmountChange: handleDelayAmountChange},
        { key: "distortion", label: "Distortion", enable: enableDistortion, amount: distortionAmount, min: 0, max: 1, step: 0.01,
            onToggle: handleEnableDistortion, onAmountChange: handleDistortionAmountChange},
        { key: "lowpass", label: "Low-pass Filter", enable: enableLowPass, amount: lowPassFreq, min: 200, max: 8000, step: 50,
            onToggle: handleEnableLowPass, onAmountChange: handleLowPassFreqChange},
        { key: "highpass", label: "High-pass Filter", enable: enableHighPass, amount: highPassFreq, min: 100, max: 3000, step: 50,
            onToggle: handleEnableHighPass, onAmountChange: handleHighPassFreqChange},
        { key: "chorus", label: "Chorus", enable: enableChorus, amount: chorusAmount, min: 0, max: 1, step: 0.01,
            onToggle: handleEnableChorus, onAmountChange: handleChorusAmountChange},
        { key: "wow", label: "WOW", enable: enableWow, amount: wowAmount, min: 0, max: 10, step: 0.1,
            onToggle: handleEnableWow, onAmountChange: handleWowAmountChange}
    ];

    // Effect setter list for simplify
    const effectSetters = {
        reverb: { setEnable: setEnableReverb, setAmount: setReverbAmount },
        delay: { setEnable: setEnableDelay, setAmount: setDelayAmount },
        distortion: { setEnable: setEnableDistortion, setAmount: setDistortionAmount },
        lowpass: { setEnable: setEnableLowPass, setAmount: setLowPassFreq },
        highpass: { setEnable: setEnableHighPass, setAmount: setHighPassFreq },
        chorus: { setEnable: setEnableChorus, setAmount: setChorusAmount },
        wow: { setEnable: setEnableWow, setAmount: setWowAmount }
    };

    return (
        <>
            <div className="container-fluid mt-3">
                {/* CPM & Keyshift */}
                <div className="row g-3 mb-3">
                    <div className="col-md-6">
                        <div className="card h-100">
                            <div className="card-header fw-semibold">CPM & Keyshift</div>
                            <div className="card-body">
                                <CPMControls cpm={cpm} localCpm={localCpm} handleCpmChange={handleCpmChange} handleQuickCpm={handleQuickCpm}/>
                                <KeyShiftControls localShift={localShift} handleKeyShiftChange={handleKeyShiftChange} handleQuickShift={handleQuickShift}/>
                            </div>
                        </div>
                    </div>

                    {/* Volume & Tracks */}
                    <div className="col-md-6">
                        <div className="card h-100">
                            <div className="card-header fw-semibold">Volume & Tracks</div>
                            <div className="card-body">
                                <VolumeControls localVolume={localVolume} handleVolumeChange={handleVolumeChange}/>

                                <TrackControls muteBass={muteBass} muteArp={muteArp} muteDrums={muteDrums}  muteDrums2={muteDrums2} handleToggle={handleToggle}/>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Effect/Settings & D3 */}
                <div className="row g-3">

                    {/* Effects & Settings */}
                    <div className="col-md-6 d-flex flex-column gap-3">
                        <EffectControls enableMasterFx={enableMasterFx} handleMasterFxToggle={handleMasterFxToggle} effects={effects}/>
                        <SettingsControls effectSetters={effectSetters} />
                    </div>

                    {/* D3 Graphs */}
                    <div className="col-md-6 d-flex flex-column">
                        <D3Graph />
                        <D3GraphScope />
                    </div>
                </div>
            </div>
      </>
  );
}

export default DJControls;