import { useState, useEffect } from 'react';

function PlayControl({ songData, editorRef, isPlaying }) {
    const DEFAULT_VOLUME = 50;

    // MOVED FROM StrudelDemo: volume state and setter. Initially set to 50.
    const [volume, setVolume] = useState(50);

    // MOVED FROM StrudelDemo: cpm setter. Initially set to 120 by default.
    const [cpm, setCpm] = useState(120);

    // Function to update the editor with current volume and CPM settings
    const updateEditorWithControls = () => {
        if (!editorRef.current) return;

        // MOVED FROM StrudelDemo: Replace the 140 with our CPM value in the existing setcps
        const updatedSongData = songData.replace("setcps(140/60/4)", `setcps(${cpm}/60/4)`);
        const volumeController = `${updatedSongData}\nall(x => x.gain(${volume / 100}))\nall(x => x.log())`;
        editorRef.current.setCode(volumeController);

        // MOVED FROM StrudelDemo: Updates Strudel editor with new code song and volume
        if (isPlaying) {
            editorRef.current.stop();
            editorRef.current.evaluate();
        }
    };

    // Handle volume change
    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
    };

    // Handle CPM change
    const handleCpmChange = (newCpm) => {
        setCpm(newCpm);
    };

    // Update editor when volume or CPM changes
    useEffect(() => {
        updateEditorWithControls();
    }, [volume, cpm, songData, isPlaying]);

    return (
        <> {/* React Fragment lets us group elements without an extra div */}
            <div className="container p-4 rounded-4 shadow glass-card border border-light-subtle">
                <h5 className="text-center mb-4 fw-bold text-light">
                    <i className="bi bi-sliders me-2"></i> Play Control Panel
                </h5>


                <div className="input-group mb-3">
                    <span className="input-group-text glass-input" id="cpm_label">SetTempo</span>
                    <input type="number" className="form-control glass-input" id="cpm_text_input" min="0" max="500" step="10" placeholder="120" aria-label="120" aria-describedby="cpm_label" value={cpm} onChange={(e) => handleCpmChange(Number(e.target.value))} />
                </div>

                <div className="p-3 rounded-3 glass-inner-card fw-semibold mb-3">
                    <label htmlFor="volume_range" className="form-label text-light">Volume Slider {volume}%</label>
                    <input type="range" className="form-range glass-input" min="0" max="100" value={volume} id="volume_range" onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    />
                </div>

                <div className="p-3 rounded-3 glass-inner-card fw-semibold mb-3">
                    <p className="fw-semibold mb-2 text-light text-center">Tracks</p>
                    <div className="d-flex justify-content-center flex-wrap gap-4">
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="drum2Switch" />
                            <label className="form-check-label text-light" htmlFor="drum2Switch">Drum 2</label>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="drumsSwitch" />
                            <label className="form-check-label text-light" htmlFor="drumsSwitch">Drums</label>
                        </div>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="bassSwitch" />
                            <label className="form-check-label text-light" htmlFor="bassSwitch">Bass</label>
                        </div>
                    </div>
                </div>

                <div className="d-flex justify-content-center gap-3 mt-3 my-5">
                    <button className="btn btn-secondary glass-btn " onClick={() => handleVolumeChange(0)}>
                        <i className="bi bi-mic-mute-fill"></i> Mute
                    </button>

                    <button className="btn btn-primary glass-btn" onClick={() => handleVolumeChange(DEFAULT_VOLUME)}>
                        <i className="bi bi-mic-fill"></i> Unmute
                    </button>

                    <button className="btn btn-warning glass-btn">
                        <i className="bi bi-shuffle"></i> Shuffle
                    </button>
                </div>

            </div >

        </>
    );
}

export default PlayControl;