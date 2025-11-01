

function ProcessButtons({ onPreprocess, onPreprocessPlay }) {
    return (
        <>
            <div className="container p-4 rounded-4 shadow-sm bg-light mt-4">
                <h5 className="text-center mb-4 fw-bold">
                    Processing Controls
                </h5>

                <div className="d-flex justify-content-center gap-3">
                    <button id="process" className="btn btn-info px-4" onClick={onPreprocess}>
                        <i className="bi bi-gear-fill"></i>
                        Preprocess
                    </button>

                    <button id="process_play" className="btn btn-success px-4" onClick={onPreprocessPlay}>
                        <i className="bi bi-play-circle-fill"></i>
                        Proc & Play
                    </button>
                </div>
            </div>
        </>
    );
}

export default ProcessButtons;

