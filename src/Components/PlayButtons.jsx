function PlayButtons({ onPlay, onStop }) {
    return (
        <>
            <div className="container p-4 rounded-4 shadow-sm glass-card">
                <h5 className="text-center mb-4 fw-bold text-light">
                    Play Buttons
                </h5>

                <div className="d-flex justify-content-center gap-3">
                    <button id="play" className="btn btn-success px-4" onClick={onPlay}>
                        <i className="bi bi-file-play-fill"></i> Play
                    </button>

                    <button id="stop" className="btn btn-danger px-4" onClick={onStop}>
                        <i className="bi bi-stop-fill"></i> Stop
                    </button>
                </div>
            </div >
        </>
    );
}

export default PlayButtons;