function EffectControls({
    enableMasterFx, handleMasterFxToggle, effects
}) {

    return (
        <>
            {/* Effects Selector Card */}
            <div className="card mb-3">
                <div className="card-header d-flex align-items-center justify-content-between">
                    <span className="fw-semibold">Effects</span>
                    <div className="form-check form-switch m-0">
                        <input className="form-check-input" type="checkbox" role="switch" id="fxMasterEnable" checked={enableMasterFx} onChange={handleMasterFxToggle} />
                        <label className="form-check-label small" htmlFor="fxMasterEnable">Master</label>
                    </div>
                </div>

                <div className="card-body">
                    {/* Loop through each effect entry */}
                    {/* Reverb, Delay, Distort, Lowpass, Highpass, Chorus, Wow */}
                    {effects.map((fx) => (
                        <div className="mb-3" key={fx.key}>
                            <div className="form-check m-0">
                                <input className="form-check-input" type="checkbox" id={`fx_${fx.key}`} checked={fx.enable} onChange={fx.onToggle}/>
                                <label className="form-check-label" htmlFor={`fx_${fx.key}`}>{fx.label}</label>
                            </div>

                            {/* Range slider */}
                            {fx.enable && (
                                <input type="range" min={fx.min} max={fx.max} step={fx.step} className="form-range mt-1" value={fx.amount} onChange={fx.onAmountChange}/>
                            )}
                        </div>
                    ))}

                </div>
            
            </div>
        </>
    );
}

export default EffectControls;
