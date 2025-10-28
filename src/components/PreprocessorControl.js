import React from 'react';

export default function PreprocessorControl({ procText, setProcText }) {
    return (
        <div>
            <label htmlFor="proc" className="form-label">Text to preprocess:</label>
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
