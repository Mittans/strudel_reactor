function ProcessButtons({ onPreprocess, onPreprocessPlay }) {

    

    return (
        <>
            <div className="container p-4 rounded-4 shadow-sm glass-card">
                <h5 className="text-center mb-4 fw-bold text-light">
                    <i className="bi bi-gear-wide-connected me-2"></i>
                    Processing Controls
                </h5>

                <div className="d-flex justify-content-center gap-3">
                    <button id="process" className="btn btn-info px-4 glass-btn" onClick={onPreprocess}>
                        <i className="bi bi-gear-fill"></i>
                        Preprocess
                    </button>

                    <button id="process_play" className="btn btn-success px-4 glass-btn" onClick={onPreprocessPlay}>
                        <i className="bi bi-play-circle-fill"></i>
                        Proc & Play
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProcessButtons;