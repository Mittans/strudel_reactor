function PlayButtons() {
    return (
        <>
            <div className="container p-4 rounded-4 shadow-sm bg-light">
                <h5 className="text-center mb-4 fw-bold">
                    Play Buttons
                </h5>

                <div className="d-flex justify-content-center gap-3">
                    <button id="play" className="btn btn-success px-4">
                        <i class="bi bi-file-play-fill"></i> Play
                    </button>

                    <button id="stop" className="btn btn-danger px-4">
                        <i className="bi bi-stop-fill"></i> Stop
                    </button>
                </div>
            </div>
        </>
    );
}

export default PlayButtons;
