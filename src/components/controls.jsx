export default function Controls({ onProcess, onProcPlay, onPlay, onStop }) {
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
            <button
                className="btn btn-outline-primary"
                onClick={onProcPlay}
            >
                <i className="bi bi-arrow-repeat"></i>  {/* replay icon */}
            </button>

        </nav>
    );
}
