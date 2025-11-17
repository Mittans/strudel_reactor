import '../DJControls.css';

function DJControls({
    cpm, onCpmChange,
    bass, onBassChange,
    melody, onMelodyChange,
    guitar, onGuitarChange,
    drums1, onDrums1Change,
    drums2, onDrums2Change,
    onSave, onLoad
}) {
    return (
        <div id="dj-controls-container">

            {/* CPM + SAVE + LOAD */}
            <div id="dj-top-row">
                <div id="dj-cpm-box">
                    <span id="cpm-label">setCPM</span>
                    <input
                        type="text"
                        id="cpm-input"
                        value={cpm}
                        onChange={onCpmChange}
                        min="60"
                        max="200"
                    />
                </div>

                <button id="save-btn" onClick={onSave}>Save Settings</button>
                <button id="load-btn" onClick={onLoad}>Load Settings</button>
            </div>

            {/* VOLUME */}
            {/*<div id="volume-section">*/}
            {/*    <label id="volume-label">*/}
            {/*        Volume ({Math.round(volume * 100)}%)*/}
            {/*    </label>*/}
            {/*    <input*/}
            {/*        type="range"*/}
            {/*        id="volume-slider"*/}
            {/*        min="0"*/}
            {/*        max="1"*/}
            {/*        step="0.01"*/}
            {/*        value={volume}*/}
            {/*        onChange={onChange}*/}
            {/*    />*/}
            {/*</div>*/}

            {/* --- Toggle Buttons --- */}
            <div id="dj-toggle-box">
                <div id="dj-toggle-row">

                    <div className="dj-item">
                        <input type="checkbox" id="drums1" checked={drums1} onChange={onDrums1Change} />
                        <label htmlFor="drums1">Drums1</label>
                        <div className="dj-icon">🥁</div>
                    </div>

                    <div className="dj-item">
                        <input type="checkbox" id="drums2" checked={drums2} onChange={onDrums2Change} />
                        <label htmlFor="drums2">Drums2</label>
                        <div className="dj-icon">🎧</div>
                    </div>

                    <div className="dj-item">
                        <input type="checkbox" id="bass" checked={bass} onChange={onBassChange} />
                        <label htmlFor="bass">Bass</label>
                        <div className="dj-icon">🎸</div>
                    </div>

                    <div className="dj-item">
                        <input type="checkbox" id="melody" checked={melody} onChange={onMelodyChange} />
                        <label htmlFor="melody">Melody</label>
                        <div className="dj-icon">🎵</div>
                    </div>

                    <div className="dj-item">
                        <input type="checkbox" id="guitar" checked={guitar} onChange={onGuitarChange} />
                        <label htmlFor="guitar">Guitar</label>
                        <div className="dj-icon">🎶</div>
                    </div>

                </div>
            </div>



        </div>
    );
}

export default DJControls;
