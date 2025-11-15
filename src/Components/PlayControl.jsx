import { useState, useEffect } from 'react';

function PlayControl({ songData, editorRef, isPlaying }) {
    const DEFAULT_VOLUME = 50;

    // MOVED FROM StrudelDemo: volume state and setter. Initially set to 50.
    const [volume, setVolume] = useState(50);

    // MOVED FROM StrudelDemo: cpm setter. Initially set to 120 by default.
    const [cpm, setCpm] = useState(120);

    //Tracks
    const [tracks, setTracks] = useState({
        drum2: true,
        drums: true,
        bass: true
    });

    const toggleTrack = (trackName) => {
        if (trackName === 'drum2') {
            setTracks({
                drum2: !tracks.drum2,
                drums: tracks.drums,
                bass: tracks.bass
            });
        } else if (trackName === 'drums') {
            setTracks({
                drum2: tracks.drum2,
                drums: !tracks.drums,
                bass: tracks.bass
            });
        } else if (trackName === 'bass') {
            setTracks({
                drum2: tracks.drum2,
                drums: tracks.drums,
                bass: !tracks.bass
            });
        }
    };

    // Function to update the editor with current volume and CPM settings
    const updateEditorWithControls = () => {
        if (!editorRef.current) return;

        // MOVED FROM StrudelDemo: Replace the 140 with our CPM value in the existing setcps
        let updatedSongData = songData.replace("setcps(140/60/4)", `setcps(${cpm}/60/4)`);

        if (!tracks.drum2) {
            updatedSongData = updatedSongData.replace(/drums2:/g, '// drums2:');
        }
        if (!tracks.drums) {
            updatedSongData = updatedSongData.replace(/drums:/g, '// drums:');
        }
        if (!tracks.bass) {
            updatedSongData = updatedSongData.replace(/bassline:/g, '// bassline:');
        }

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
    }, [volume, cpm, songData, isPlaying, tracks]);

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
                    <div className="d-flex justify-content-between flex-wrap gap-1 mb-3">
                        {[0, 25, 50, 75, 100].map((vol) => (
                            <button
                                key={vol}
                                className="btn btn-sm btn-outline-light"
                                onClick={() => handleVolumeChange(vol)} >
                                {vol}%
                            </button>
                        ))}
                    </div>

                    <div className="p-3 rounded-3 glass-inner-card fw-semibold mb-3">
                        <h5 className="fw-semibold mb-2 text-light text-center">Tracks</h5>
                        <div className="d-flex justify-content-center flex-wrap gap-4">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="drum2Switch"
                                    checked={tracks.drum2}
                                    onChange={() => toggleTrack('drum2')}
                                />
                                <label className="form-check-label text-light" htmlFor="drum2Switch">Drum 2</label>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="drumsSwitch"
                                    checked={tracks.drums}
                                    onChange={() => toggleTrack('drums')}
                                />
                                <label className="form-check-label text-light" htmlFor="drumsSwitch">Drums</label>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="bassSwitch"
                                    checked={tracks.bass}
                                    onChange={() => toggleTrack('bass')}
                                />
                                <label className="form-check-label text-light" htmlFor="bassSwitch">Bass</label>
                            </div>
                        </div>
                    </div>


                    {/* ACTION BUTTON BAR */}
                    <div className="mt-4">
                        <div className="d-flex w-100 rounded-3 overflow-hidden border border-light-subtle">

                            {/* MUTE */}
                            <button
                                className="btn glass-btn flex-fill py-2 border-end"
                                onClick={() => handleVolumeChange(0)}
                            >
                                <i className="bi bi-volume-mute-fill text-danger"></i>
                            </button>

                            {/* UNMUTE */}
                            <button
                                className="btn glass-btn flex-fill py-2 border-end"
                                onClick={() => handleVolumeChange(DEFAULT_VOLUME)}
                            >
                                <i className="bi bi-volume-up-fill text-success"></i>
                            </button>

                            {/* SHUFFLE */}
                            <button className="btn glass-btn flex-fill py-2 border-end">
                                <i className="bi bi-shuffle text-warning"></i>
                            </button>

                            {/* RESET BUTTON */}
                            <button
                                className="btn glass-btn flex-fill py-2"
                                onClick={() => {
                                    setVolume(50);
                                    setCpm(120);
                                }}
                            >
                                <i className="bi bi-arrow-clockwise text-info"></i>
                            </button>

                        </div>
                    </div>

                </div>
            </div>

        </>
    );
}

export default PlayControl;