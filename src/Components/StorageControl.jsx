

function Storage({ volume, tempo, tracks, setVolume, setTempo, setTracks }) {
    const saveSettings = () => {
        const settings = {
            volume: volume,
            tempo: tempo,
            tracks: tracks
        };
        localStorage.setItem('musicSettings', JSON.stringify(settings));
        alert('Settings saved!');
    };

    const loadSettings = () => {
        const saved = localStorage.getItem('musicSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            setVolume(settings.volume);
            setTempo(settings.tempo);
            setTracks(settings.tracks);
            alert('Settings loaded!');
        } else {
            alert('No saved settings found');
        }
    };

    return (
        <div className="container p-4 rounded-4 shadow-sm glass-card mt-4">
            <h5 className="text-center mb-3 fw-bold text-light">Save/Load</h5>
            <div className="d-grid gap-2">
                <button className="btn btn-success" onClick={saveSettings}>
                    Save Settings
                </button>
                <button className="btn btn-info" onClick={loadSettings}>
                    Load Settings
                </button>
            </div>
        </div>
    );
}

export default Storage;

