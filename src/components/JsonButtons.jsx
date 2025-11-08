import React from "react";

export default function JsonButtons({ onSaveJson, onLoadJson }) {
    return (
        <div className="mb-3">
            <button className="btn btn-primary me-2" onClick={onSaveJson}>
                Save Song's JSON
            </button>

            <label className="btn btn-outline-secondary mb-0">
                Load Song's JSON
                <input type="file" accept="application/json" hidden onChange={onLoadJson} />
            </label>
        </div>
    );
}