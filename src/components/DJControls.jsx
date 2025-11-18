import '../DJControls.css';

function DJControls({
    cpm,
    onCpmChange,
    setCpm,
    onMessage,
    bass, onBassChange,
    melody, onMelodyChange,
    guitar, onGuitarChange,
    drums1, onDrums1Change,
    drums2, onDrums2Change,
    onSave, onLoad
}) {

    // When the user leaves the CPM box, validate the value.
    // If it's outside 60–200, reset it to 120 and show a message.
    const handleCpmBlur = () => {
        const num = Number(cpm);

        if (!num || num < 60 || num > 200) {
            onMessage("Enter CPM value between 60 and 200");
            setCpm(120);
            return;
        }

        // If valid, keep the entered number.
        setCpm(num);
    };

    

    return (
        <div id="dj-controls-container">

            {/* CPM + SAVE + LOAD */}
            <div id="dj-top-row">
                <div id="dj-cpm-box">
                    <span id="cpm-label">setCPM</span>
                    <input
                        id="cpm-input"
                        type="text"
                        value={cpm}
                        onChange={onCpmChange}
                        onBlur={handleCpmBlur}
                        aria-label="cpm"
                        aria-describedby="cpm_label"
                        min="60"
                        max="200"
                        step="1"
                    />
                </div>

                <button id="save-btn" onClick={onSave}>Save Settings</button>
                <button id="load-btn" onClick={onLoad}>Load Settings</button>

            </div>

            {/* --- Toggle Buttons --- */}
            <div id="dj-toggle-box">
                <div id="dj-toggle-row">

                    {/* Each item is a checkbox with a matching icon */}
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
