import { CONTROL_DEFINITIONS } from '../utils/controlDefinitions.js';

function Strudel({ onModeChange, activeControls, controlValues, onControlChange }) {
    return (
        <>
            <label className="form-label fw-bold">Preprocessing Controls:</label>

            {/* Existing toggle */}
            <div className="procControls mb-3">
                <input
                    type="checkbox"
                    className="form-check-input"
                    onClick={(e) => onModeChange(e.target.checked ? "hush" : "on")}
                />
                <label className="form-check-label ms-2">
                    P1 Control
                </label>
            </div>

            {/* DYNAMICALLY GENERATED CONTROLS */}
            {activeControls.map(key => {
                const def = CONTROL_DEFINITIONS[key];

                return (
                    <div className="mb-3" key={key}>
                        <label className="fw-bold">{key}</label>

                        {def.type === "slider" && (
                            <input
                                type="range"
                                min={def.min}
                                max={def.max}
                                step={def.step}
                                value={controlValues[key]}
                                onChange={(e) => onControlChange(key, parseFloat(e.target.value))}
                                className="form-range"
                            />
                        )}

                        {def.type === "number" && (
                            <input
                                type="number"
                                min={def.min}
                                max={def.max}
                                value={controlValues[key]}
                                onChange={(e) => onControlChange(key, parseFloat(e.target.value))}
                                className="form-control"
                            />
                        )}
                    </div>
                );
            })}
        </>
    );
}

export default Strudel;
