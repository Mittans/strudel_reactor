import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function SaveAndLoadButtons({ MuteState, setMuteState }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const saveState = () => {
        let State = {};
        let value = document.getElementById("proc").value;
        State["music"] = value;
        State["Mute"] = MuteState;
        State = JSON.stringify(State);
        const blob = new Blob([State], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;

        let filename = document.getElementById("filename").value;

        if (!filename) {
            filename = "data";
        }

        link.download = filename + ".json";
        link.click();
        URL.revokeObjectURL(url);
        handleClose();
    };

    const loadState = () => {
        let State = document.createElement("input");
        State.type = "file";
        State.accept = "application/json";
        State.onchange = (load) => {
            let file = load.target.files[0];
            let reader = new FileReader();
            reader.onload = (event) => {
                let result = event.target.result;
                let json = JSON.parse(result);
                if (json.music) {
                    document.getElementById("proc").value = json.music;
                }
                if (json.Mute) {
                    setMuteState(json.Mute);
                }
            };
            reader.readAsText(file);
        };
        State.click();
    };
    return (
        <>
            <div className="d-flex mb-3 pt-2">
                <div className="col-6 text-center pe-2">
                    <button
                        id="save"
                        className="btn btn-outline-primary"
                        style={{ width: "97.5%" }}
                        onClick={() => handleShow()}
                    >
                        Save
                    </button>
                </div>
                <div className="col-6 text-center">
                    <button
                        id="load"
                        className="btn btn-outline-primary"
                        style={{ width: "97.5%" }}
                        onClick={() => loadState()}
                    >
                        Load
                    </button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Strudel</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label htmlFor="filename">Strudel File Name:</label>
                    <div className="input-group col-12">
                        <input type="text" className="form-control" id="filename"></input>
                        <span className="input-group-text">.json</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={handleClose}>
                        Close
                    </button>
                    <button className="btn btn-primary" onClick={saveState}>
                        Save
                    </button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SaveAndLoadButtons;
