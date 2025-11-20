import { useState, useEffect } from 'react';
import Storage from './StorageControl';

function PlayControl({ songData, editorRef, isPlaying }) {
    const DEFAULT_VOLUME = 50;
    const DEFAULT_CPM = 120;

    // volume state (starts at 50)
    const [volume, setVolume] = useState(DEFAULT_VOLUME);

    // tempo state (starts at 120)
    const [cpm, setCpm] = useState(DEFAULT_CPM);

    // track toggle states
    const [tracks, setTracks] = useState({
        drum2: true,
        drums: true,
        bass: true
    });

    // toggle individual track on/off
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

    // update Strudel editor code using the slider + toggles
    const updateEditorWithControls = () => {
        if (!editorRef.current) return;

        // update tempo section
        let updatedSongData = songData.replace(/setcps\([^)]*\)/, `setcps(${cpm}/60/4)`);

        // start by uncommenting all tracks
        updatedSongData = updatedSongData
            .replace(/\/\/\s*drums2:/g, 'drums2:')
            .replace(/\/\/\s*drums:/g, 'drums:')
            .replace(/\/\/\s*bassline:/g, 'bassline:');

        // comment out track if toggle is OFF
        if (!tracks.drum2) updatedSongData = updatedSongData.replace(/drums2:/g, '// drums2:');
        if (!tracks.drums) updatedSongData = updatedSongData.replace(/drums:/g, '// drums:');
        if (!tracks.bass) updatedSongData = updatedSongData.replace(/bassline:/g, '// bassline:');

        // add volume + log
        const volumeController =
            `${updatedSongData}\nall(x => x.gain(${volume / 100}))\nall(x => x.log())`;

        // update code in editor
        editorRef.current.setCode(volumeController);

        // refresh Strudel if currently playing
        if (isPlaying) {
            editorRef.current.stop();
            editorRef.current.evaluate();
        }
    };

    // update volume state
    const handleVolumeChange = (newVolume) => {
        setVolume(newVolume);
    };

    // update tempo state
    const handleCpmChange = (newCpm) => {
        setCpm(newCpm);
    };

    // preset options for shuffle button
    const presets = [
        { tempo: 120, volume: 50, tracks: { drum2: true, drums: false, bass: true } },
        { tempo: 150, volume: 75, tracks: { drum2: false, drums: true, bass: true } },
        { tempo: 90, volume: 25, tracks: { drum2: true, drums: true, bass: false } }
    ];

    // random preset selector
    const handleShuffle = () => {
        const random = presets[Math.floor(Math.random() * presets.length)];
        setCpm(random.tempo);
        setVolume(random.volume);
        setTracks(random.tracks);   // update switches too
    };

    // run editor update when anything changes
    useEffect(() => {
        updateEditorWithControls();
    }, [volume, cpm, songData, isPlaying, tracks]);

    return (
        <> {/* fragment wrapper */}
            <div className="container p-4 rounded-4 shadow glass-card border border-light-subtle">
                <h5 className="text-center mb-4 fw-bold text-light">
                    <i className="bi bi-sliders me-2"></i> Play Control Panel
                </h5>

                {/* tempo input box */}
                <div className="input-group mb-3">
                    <span className="input-group-text glass-input" id="cpm_label">SetTempo</span>
                    <input
                        type="number"
                        className="form-control glass-input"
                        id="cpm_text_input"
                        min="0"
                        max="500"
                        step="10"
                        placeholder="120"
                        aria-label="120"
                        aria-describedby="cpm_label"
                        value={cpm}
                        onChange={(e) => handleCpmChange(Number(e.target.value))}
                    />
                </div>

                <div className="p-3 rounded-3 glass-inner-card fw-semibold mb-3">

                    {/* volume slider */}
                    <label htmlFor="volume_range" className="form-label text-light">
                        Volume Slider {volume}%
                    </label>
                    <input
                        type="range"
                        className="form-range glass-input"
                        min="0"
                        max="100"
                        value={volume}
                        id="volume_range"
                        onChange={(e) => handleVolumeChange(Number(e.target.value))}
                    />

                    {/* quick volume buttons */}
                    <div className="d-flex justify-content-between flex-wrap gap-1 mb-3">
                        {[0, 25, 50, 75, 100].map((vol) => (
                            <button
                                key={vol}
                                className="btn btn-sm btn-outline-light"
                                onClick={() => handleVolumeChange(vol)}
                            >
                                {vol}%
                            </button>
                        ))}
                    </div>

                    {/* track switches */}
                    <div className="p-3 rounded-3 glass-inner-card fw-semibold mb-3">
                        <h5 className="fw-semibold mb-2 text-light text-center">Tracks</h5>

                        <div className="d-flex justify-content-center flex-wrap gap-4">

                            {/* drum2 switch */}
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="drum2Switch"
                                    checked={tracks.drum2}
                                    onChange={() => toggleTrack('drum2')}
                                />
                                <label className="form-check-label text-light" htmlFor="drum2Switch">
                                    Drum 2
                                </label>
                            </div>

                            {/* drums switch */}
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="drumsSwitch"
                                    checked={tracks.drums}
                                    onChange={() => toggleTrack('drums')}
                                />
                                <label className="form-check-label text-light" htmlFor="drumsSwitch">
                                    Drums
                                </label>
                            </div>

                            {/* bass switch */}
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="bassSwitch"
                                    checked={tracks.bass}
                                    onChange={() => toggleTrack('bass')}
                                />
                                <label className="form-check-label text-light" htmlFor="bassSwitch">
                                    Bass
                                </label>
                            </div>

                        </div>
                    </div>

                    {/* bottom button row */}
                    <div className="mt-4">
                        <div className="d-flex w-100 rounded-3 overflow-hidden border border-light-subtle">

                            {/* mute */}
                            <button
                                className="btn glass-btn flex-fill py-2 border-end"
                                onClick={() => handleVolumeChange(0)}
                            >
                                <i className="bi bi-volume-mute-fill text-danger"></i>
                            </button>

                            {/* reset volume */}
                            <button
                                className="btn glass-btn flex-fill py-2 border-end"
                                onClick={() => handleVolumeChange(DEFAULT_VOLUME)}
                            >
                                <i className="bi bi-volume-up-fill text-success"></i>
                            </button>

                            {/* shuffle */}
                            <button
                                className="btn glass-btn flex-fill py-2 border-end"
                                onClick={handleShuffle}
                            >
                                <i className="bi bi-shuffle text-warning"></i>
                            </button>

                            {/* reset all settings */}
                            <button
                                className="btn glass-btn flex-fill py-2"
                                onClick={() => {
                                    setVolume(DEFAULT_VOLUME);
                                    setCpm(DEFAULT_CPM);
                                    setTracks({ drum2: true, drums: true, bass: true });
                                }}
                            >
                                <i className="bi bi-arrow-clockwise text-info"></i>
                            </button>

                        </div>
                    </div>

                </div>
            </div>

            {/* save/load settings */}
            <Storage
                volume={volume}
                tempo={cpm}
                tracks={tracks}
                setVolume={setVolume}
                setTempo={setCpm}
                setTracks={setTracks}
            />
        </>
    );
}

export default PlayControl;
