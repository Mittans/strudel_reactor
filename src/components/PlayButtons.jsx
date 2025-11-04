function PlayButtons({ onPlay, onStop }) {
    return (
        <div className="card border-0 shadow-sm mb-3">
            <div className="card-body p-3">
                <h6 className="text-muted text-uppercase mb-3" style={{ fontSize: '1rem', letterSpacing: '1px' }}>
                    Playback
                </h6>
                <div className="d-grid gap-2">
                    <button 
                        id="play" 
                        className="btn btn-success btn-lg" 
                        onClick={onPlay}
                    >
                        <i className="bi bi-play-circle-fill me-2"></i>
                        Play
                    </button>
                    <button 
                        id="stop" 
                        className="btn btn-danger btn-lg" 
                        onClick={onStop}
                    >
                        <i className="bi bi-pause-circle-fill me-2"></i>
                        Stop
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlayButtons;