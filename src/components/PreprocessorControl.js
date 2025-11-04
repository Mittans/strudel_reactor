import React from 'react';

export default function PreprocessorControl({ procText, setProcText }) {
    return (
        <div>
            <p style={{ fontSize: "18px", fontWeight: "500", color: "#8b0000", textTransform: "uppercase", letterSpacing: "1px", textShadow: "0 0 8px rgba(255,204,0,0.6)", marginBottom: "15px" }}>Text Editor</p>
            <textarea
                className="form-control"
                rows="15"
                id="proc"
                value={procText}
                onChange={e => setProcText(e.target.value)}
            />
        </div>
    );
}
