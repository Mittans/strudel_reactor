function EffectControls({
    enableMasterFx,
    handleMasterFxToggle,

    enableReverb, reverbAmount,
    handleEnableReverb, handleReverbAmountChange,

    enableDelay, delayAmount,
    handleEnableDelay, handleDelayAmountChange,

    enableDistortion, distortionAmount,
    handleEnableDistortion, handleDistortionAmountChange,

    enableLowPass, lowPassFreq,
    handleEnableLowPass, handleLowPassFreqChange,

    enableHighPass, highPassFreq,
    handleEnableHighPass, handleHighPassFreqChange,

    enableChorus, chorusAmount,
    handleEnableChorus, handleChorusAmountChange,

    enableWow, wowAmount,
    handleEnableWow, handleWowAmountChange
}) {

    return (
        <>
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
                            <input className="form-check-input" type="checkbox" id="fxReverb" checked={enableReverb} onChange={handleEnableReverb} />
                            <label className="form-check-label" htmlFor="fxReverb">Reverb</label>
                        </div>
                        {enableReverb && (
                            <input type="range" min="0" max="1" step="0.01" className="form-range mt-1" value={reverbAmount} onChange={handleReverbAmountChange} />
                        )}
                    </div>

                    {/* Delay */}
                    <div className="mb-3">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxDelay" checked={enableDelay} onChange={handleEnableDelay} />
                            <label className="form-check-label" htmlFor="fxDelay"> Delay</label>
                        </div>
                        {enableDelay && (
                            <input type="range" min="0" max="1" step="0.01" className="form-range mt-1" value={delayAmount} onChange={handleDelayAmountChange} />
                        )}
                    </div>

                    {/* Distortion */}
                    <div className="mb-3">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxDistortion" checked={enableDistortion} onChange={handleEnableDistortion} />
                            <label className="form-check-label" htmlFor="fxDistortion">Distortion</label>
                        </div>
                        {enableDistortion && (
                            <input type="range" min="0" max="1" step="0.01" className="form-range mt-1" value={distortionAmount} onChange={handleDistortionAmountChange} />
                        )}
                    </div>

                    {/* Low-pass Filter */}
                    <div className="mb-3">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxLowPass" checked={enableLowPass} onChange={handleEnableLowPass} />
                            <label className="form-check-label" htmlFor="fxLowPass">Low-pass Filter</label>
                        </div>
                        {enableLowPass && (
                            <input type="range" min="200" max="8000" step="50" className="form-range mt-1" value={lowPassFreq} onChange={handleLowPassFreqChange} />
                        )}
                    </div>

                    {/* High-pass Filter */}
                    <div className="mb-3">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxHighPass" checked={enableHighPass} onChange={handleEnableHighPass} />
                            <label className="form-check-label" htmlFor="fxHighPass">High-pass Filter</label>
                        </div>
                        {enableHighPass && (
                            <input type="range" min="100" max="3000" step="50" className="form-range mt-1" value={highPassFreq} onChange={handleHighPassFreqChange} />
                        )}
                    </div>

                    {/* Chorus */}
                    <div className="mb-3">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxChorus" checked={enableChorus} onChange={handleEnableChorus} />
                            <label className="form-check-label" htmlFor="fxChorus">Chorus</label>
                        </div>
                        {enableChorus && (
                            <input type="range" min="0" max="1" step="0.01" className="form-range mt-1" value={chorusAmount} onChange={handleChorusAmountChange} />
                        )}
                    </div>

                    {/* WOW */}
                    <div className="mb-1">
                        <div className="form-check m-0">
                            <input className="form-check-input" type="checkbox" id="fxWow" checked={enableWow} onChange={handleEnableWow} />
                            <label className="form-check-label" htmlFor="fxWow">
                                WOW
                            </label>
                        </div>
                        {enableWow && (
                            <input type="range" min="0" max="10" step="0.1" className="form-range mt-1" value={wowAmount} onChange={handleWowAmountChange} />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default EffectControls;
