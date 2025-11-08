import React, { useState } from "react";
import { FaVolumeUp } from "react-icons/fa";

// DefaultValue: initial volume level (default: 0.3)
export default function VolumeControl({ defaultValue = 0.3, onVolumeChange }) {
    const [visible, setVisible] = useState(false);

    return (
        // Displays a speaker icon button that toggles a hidden volume slider
        <div style={{ marginTop: "1rem" }}>
            <button
                onClick={() => setVisible(!visible)}
                title="Toggle Volume Control"
                style={{ border: "none", background: "none", cursor: "pointer" }}
            >
                <FaVolumeUp size={20} />
            </button>

            {visible && (
                <input
                    id="gainControl"
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    defaultValue={defaultValue}
                    className="form-range"
                    style={{ display: "block", marginTop: "0.5rem" }}
                    // When the slider is moved, it triggers the onVolumeChange callback passed via props
                    // onVolumeChange: function(value) — called when slider value changes
                    onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
                />
            )}
        </div>
    );
}
