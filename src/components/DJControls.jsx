import { useState, useEffect } from 'react';
import { Dropdown } from 'bootstrap';
import CPMControls from "./DJcomponents/CPMControls";
import VolumeControls from "./DJcomponents/VolumeControls";
import TrackControls from "./DJcomponents/TrackControls";
import KeyShiftControls from "./DJcomponents/KeyShiftControls";
import EffectControls from "./DJcomponents/EffectControls";
import SettingsControls from "./DJcomponents/SettingsControls";
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
            <CPMControls cpm={cpm} localCpm={localCpm} handleCpmChange={handleCpmChange} handleQuickCpm={handleQuickCpm}/>

            <VolumeControls localVolume={localVolume} handleVolumeChange={handleVolumeChange} />

            <TrackControls muteBass={muteBass} muteArp={muteArp} muteDrums={muteDrums} muteDrums2={muteDrums2} handleToggle={handleToggle}/>

            <KeyShiftControls localShift={localShift} handleKeyShiftChange={handleKeyShiftChange} handleQuickShift={handleQuickShift}/>

            <EffectControls
                enableMasterFx={enableMasterFx}
                handleMasterFxToggle={handleMasterFxToggle}

                enableReverb={enableReverb}
                reverbAmount={reverbAmount}
                handleEnableReverb={handleEnableReverb}
                handleReverbAmountChange={handleReverbAmountChange}

                enableDelay={enableDelay}
                delayAmount={delayAmount}
                handleEnableDelay={handleEnableDelay}
                handleDelayAmountChange={handleDelayAmountChange}

                enableDistortion={enableDistortion}
                distortionAmount={distortionAmount}
                handleEnableDistortion={handleEnableDistortion}
                handleDistortionAmountChange={handleDistortionAmountChange}

                enableLowPass={enableLowPass}
                lowPassFreq={lowPassFreq}
                handleEnableLowPass={handleEnableLowPass}
                handleLowPassFreqChange={handleLowPassFreqChange}

                enableHighPass={enableHighPass}
                highPassFreq={highPassFreq}
                handleEnableHighPass={handleEnableHighPass}
                handleHighPassFreqChange={handleHighPassFreqChange}

                enableChorus={enableChorus}
                chorusAmount={chorusAmount}
                handleEnableChorus={handleEnableChorus}
                handleChorusAmountChange={handleChorusAmountChange}

                enableWow={enableWow}
                wowAmount={wowAmount}
                handleEnableWow={handleEnableWow}
                handleWowAmountChange={handleWowAmountChange}/>

            <SettingsControls
                setEnableReverb={setEnableReverb}
                setReverbAmount={setReverbAmount}

                setEnableDelay={setEnableDelay}
                setDelayAmount={setDelayAmount}

                setEnableDistortion={setEnableDistortion}
                setDistortionAmount={setDistortionAmount}

                setEnableLowPass={setEnableLowPass}
                setLowPassFreq={setLowPassFreq}

                setEnableHighPass={setEnableHighPass}
                setHighPassFreq={setHighPassFreq}

                setEnableChorus={setEnableChorus}
                setChorusAmount={setChorusAmount}

                setEnableWow={setEnableWow}
                setWowAmount={setWowAmount} />

      </>
  );
}

export default DJControls;