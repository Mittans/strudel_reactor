import { CONTROL_DEFINITIONS } from '../utils/controlDefinitions.js';

function Strudel({ activeControls, controlValues, onControlChange, bpmValue, onBpmChange }) {
    // Calculate the resulting CPS value
    const cpsValue = (bpmValue / 60 / 4).toFixed(4);

    return (
        <>
            <label className="form-label fw-bold">Preprocessing Controls:</label>

            {/* BPM Control */}
            <div className="mb-3">
                <label className="fw-bold">
                    BPM: <span className="text-primary">{bpmValue}</span>
                </label>
                <input
                    type="number"
                    min={40}
                    max={240}
                    step={1}
                    value={bpmValue}
                    onChange={(e) => onBpmChange(parseFloat(e.target.value))}
                    className="form-control"
                />
            </div>

            {/* DYNAMICALLY GENERATED CONTROLS */}
            {activeControls.map(key => {
                const def = CONTROL_DEFINITIONS[key];
                const value = controlValues[key] ?? def.default;

                return (
                    <div className="mb-3" key={key}>
                        <label className="fw-bold">
                            {key}: <span className="text-primary">{value}</span>
                        </label>

                        {def.type === "slider" && (
                            <input
                                type="range"
                                min={def.min}
                                max={def.max}
                                step={def.step}
                                value={value}
                                onChange={(e) => onControlChange(key, parseFloat(e.target.value))}
                                className="form-range"
                            />
                        )}

                        {def.type === "number" && (
                            <input
                                type="number"
                                min={def.min}
                                max={def.max}
                                value={value}
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