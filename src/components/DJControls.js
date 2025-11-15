// src/components/DJControls.jsx
import React from 'react';

function DJControls() {
    return (
        <div>
            <details className="control-section" open>
                <summary>
                    <span>🎚️ Mix & Tempo</span>
                    <span className="text-muted small">Volume / CPM</span>
                </summary>

                <div className="mt-3">
                    <div className="mb-3">
                        <label htmlFor="master_volume_slider" className="form-label">Master Volume</label>
                        <input
                            type="range"
                            id="master_volume_slider"
                            className="form-range"
                            min="0"
                            max="1"
                            step="0.01"
                            defaultValue="0.8"
                            onInput={(e) => {
                                const val = Number(e.target.value).toFixed(2);
                                const el = document.getElementById('master_volume_value');
                                if (el) el.textContent = val;
                            }}
                        />
                        <small>Current: <span id="master_volume_value">0.80</span></small>
                    </div>

                    <div className="mb-1">
                        <label htmlFor="cpm_input" className="form-label">Cycles per Minute (CPM)</label>
                        <input
                            type="number"
                            id="cpm_input"
                            className="form-control"
                            min="10"
                            max="400"
                            step="1"
                            defaultValue="140"
                        />
                    </div>
                </div>
            </details>

            <details className="control-section" open>
                <summary>
                    <span>🥁 Instruments</span>
                    <span className="text-muted small">P1 / P2 / P3</span>
                </summary>

                <div className="mt-3">
                    <div className="mb-2">
                        <p className="mb-1">p1</p>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                defaultChecked
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                p1: ON
                            </label>
                        </div>
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                            />
                            <label className="form-check-label" htmlFor="flexRadioDefault2">
                                p1: HUSH
                            </label>
                        </div>
                    </div>
                    <div className="mb-2">
                        <p className="mb-1">p2 / p3</p>
                        <div className="d-flex flex-wrap gap-2 align-items-center">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="p2Radio"
                                    id="flexRadioDefault3"
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault3">
                                    p2: ON
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="p2Radio"
                                    id="flexRadioDefault4"
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault4">
                                    p2: Hush
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="p3Radio"
                                    id="flexRadioDefault5"
                                    defaultChecked
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault5">
                                    p3: On
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="p3Radio"
                                    id="flexRadioDefault6"
                                />
                                <label className="form-check-label" htmlFor="flexRadioDefault6">
                                    p3: Hush
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </details>

            <details className="control-section">
                <summary>
                    <span>🎼 Patterns</span>
                    <span className="text-muted small">Song variation</span>
                </summary>

                <div className="mt-3">
                    <div className="mb-2">
                        <label htmlFor="pattern_select" className="form-label">Pattern</label>
                        <select
                            id="pattern_select"
                            className="form-select"
                            defaultValue="0"
                        >
                            <option value="0">Pattern A</option>
                            <option value="1">Pattern B</option>
                            <option value="2">Pattern C</option>
                        </select>
                    </div>
                </div>
            </details>
        </div>
    );
}

export default DJControls;
