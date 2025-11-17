import React from "react";

export default function JsonButtons({ onSaveJson, onLoadJson }) {
    return (
        <div className="d-inline-flex gap-23">
            <button className="btn btn-outline-primary">Save Song's JSON</button>

            <label className="btn btn-outline-secondary mb-0">
                Load Song's JSON
                <input type="file" accept="application/json" hidden onChange={onLoadJson} />
            </label>
        </div>
    );
}