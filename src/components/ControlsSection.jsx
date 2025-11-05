import { useRef, useState, useEffect } from "react";
function ControlsSection({ CPS, onChange, volume, onVolumeChange }) {
    const initialCPS = useRef(CPS);
    const [inputValue, setInputValue] = useState(CPS);

    const handleChange = e => {
        const val = e.target.value;
        setInputValue(val);

        const num = parseInt(val, 10);
        if (!isNaN(num)) onChange(num);
    };

    useEffect(() => {
        setInputValue(CPS.toString());
    }, [CPS]);

    const handleVolumeChange = e => {
        const val = parseFloat(e.target.value);
        onVolumeChange(val);
    };

    return (
        <>
            <div className="mb-3">
                <div className="input-group">
                    <span className="input-group-text" id="cps_label">Set CPS</span>
                    <input
                        type="text"
                        className="form-control"
                        value={inputValue}
                        placeholder="CPS (cycles per second) e.g. 140"
                        onChange={handleChange}
                    />
                </div>
                <p className="text-muted small">Default: {initialCPS.current}</p>
            </div>

            <div className="mb-3">
                <label htmlFor="volume_range" className="form-label">Volume: {(volume * 100) + "%"}</label>
                <input
                    type="range"
                    className="form-range"
                    min="0"
                    max="2"
                    step="0.01"
                    id="volume_range"
                    value={volume}
                    onChange={handleVolumeChange}
                />
            </div>
        </>
    );
}

export default ControlsSection;