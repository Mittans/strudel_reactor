function SaveAndLoadButtons({ globalEditor }) {
    return (
        <div className="d-flex mb-3 pt-2">
            <div className="col-6 text-center pe-2">
                <button
                    id="save"
                    className="btn btn-outline-primary"
                    style={{ width: "97.5%" }}
                    onClick={() => globalEditor.evaluate()}
                >
                    Save
                </button>
            </div>
            <div className="col-6 text-center">
                <button
                    id="load"
                    className="btn btn-outline-primary"
                    style={{ width: "97.5%" }}
                    onClick={() => globalEditor.stop()}
                >
                    Load
                </button>
            </div>
        </div>
    );
}

export default SaveAndLoadButtons;
