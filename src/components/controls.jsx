export default function Controls({ onProcess, onProcPlay, onPlay, onStop , replay}) {
    return (
        <nav style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: '1rem' }}>
            <button className="btn btn-outline-primary" onClick={onProcess}>
                Preprocess
            </button>
            <button className="btn btn-outline-primary" onClick={onProcPlay}>
                Proc & Play
            </button>
            <button className="btn btn-outline-success" onClick={onPlay}>
                Play
            </button>
            <button className="btn btn-outline-danger" onClick={onStop}>
                Stop
            </button>
            <button className="no-outline-button"
                onClick={replay}
            >
                🔄
            </button>

        </nav>
    );
}
