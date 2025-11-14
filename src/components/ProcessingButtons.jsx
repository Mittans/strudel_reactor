function ProcessingButtons({ globalEditor, Proc }) {
    // Processes the song and plays it
    const buttonPress = () => {
        if (globalEditor != null) {
            Proc();
            globalEditor.evaluate();
        }
    };

    // Creates buttons to process and process and play a song.
    return (
        <div className="d-flex w-100 my-2">
            <div className="col-6 text-center me-1">
                <button
                    id="process"
                    className="btn btn-outline-primary"
                    style={{ width: "97.5%" }}
                    onClick={() => Proc()}
                >
                    Preprocess
                </button>
            </div>
            <div className="col-6 text-center">
                <button
                    id="process_play"
                    className="btn btn-outline-primary"
                    style={{ width: "97.5%" }}
                    onClick={() => buttonPress()}
                >
                    Proc & Play
                </button>
            </div>
        </div>
    );
}

export default ProcessingButtons;
