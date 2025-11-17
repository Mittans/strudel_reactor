import { useState } from "react";
import Modal from "react-bootstrap/Modal";

function SaveAndLoadButtons({
    MuteState,
    setMuteState,
    volumeState,
    setVolumeState,
    Tracks,
    lowPassState,
    setLowPassState,
    mediumPassState,
    setMediumPassState,
    highPassState,
    setHighPassState,
    roomState,
    setRoomState,
    roomLowPassState,
    setRoomLowPassState,
    roomFadeState,
    setRoomFadeState,
    roomDecayState,
    setRoomDecayState,
    roomSustainState,
    SetRoomSustainState,
}) {
    // Variables and functions used to show modal when save is clicked and
    // close modal once user has saved the name chosen
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Saves the json file to downloads
    // Names file the name given by user
    // if no name given by user names the file a default name.
    const saveState = () => {
        let State = {};
        let value = document.getElementById("proc").value;
        State["music"] = value;
        State["Mute"] = MuteState;
        State["Volume"] = volumeState;
        State["lowPass"] = lowPassState;
        State["mediumPass"] = mediumPassState;
        State["highPass"] = highPassState;
        State["Room"] = roomState;
        State["RoomLowPass"] = roomLowPassState;
        State["RoomFade"] = roomFadeState;
        State["RoomDecay"] = roomDecayState;
        State["RoomSustain"] = roomSustainState;
        Tracks.map((track) => (State[`${track}_volume`] = volumeState[track]));
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

    // Allows user to load json file from file system when load button is pressed.
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
                if (json.Volume) {
                    setVolumeState(json.Volume);
                }
                if (json.lowPass) {
                    setLowPassState(json.lowPass);
                }
                if (json.mediumPass) {
                    setMediumPassState(json.mediumPass);
                }
                if (json.highPass) {
                    setHighPassState(json.highPass);
                }
                if (json.Room) {
                    setRoomState(json.Room);
                }
                if (json.RoomLowPass) {
                    setRoomLowPassState(json.RoomLowPass);
                }
                if (json.RoomFade) {
                    setRoomFadeState(json.RoomFade);
                }
                if (json.RoomDecay) {
                    setRoomDecayState(json.RoomDecay);
                }
                if (json.RoomSustain) {
                    SetRoomSustainState(json.RoomSustain);
                }
                Tracks.map((track) => (volumeState[track] = json.$track_volume));
            };
            reader.readAsText(file);
        };
        State.click();
    };

    // Creates the buttons to save and load a json file.
    // Creates a modal to name the file being saved.
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
