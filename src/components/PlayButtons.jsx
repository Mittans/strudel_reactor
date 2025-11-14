function PlayButtons({ globalEditor }) {
    // Creates buttons to play and stop the song
    return (
        <div className="d-flex w-100 mb-3">
            <div className="col-6 text-center me-1">
                <button
                    id="play"
                    className="btn btn-outline-primary"
                    style={{ width: "97.5%" }}
                    onClick={() => globalEditor.evaluate()}
                >
                    Play
                </button>
            </div>
            <div className="col-6 text-center">
                <button
                    id="stop"
                    className="btn btn-outline-primary"
                    style={{ width: "97.5%" }}
                    onClick={() => globalEditor.stop()}
                >
                    Stop
                </button>
            </div>
        </div>
    );
}

export default PlayButtons;
