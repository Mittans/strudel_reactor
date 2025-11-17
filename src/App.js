import "./App.css";
import { useEffect, useState } from "react";
import Processor from "./components/Processor";
import Strudel from "./components/Strudel";
import SaveAndLoadButtons from "./components/SaveAndLoadButtons";
import Reverb from "./components/Reverb";
import Navigation from "./components/Navigation";
import Graph from "./components/Graph";

export default function StrudelDemo() {
    // creates a global variable for each filter of volume control
    const [globalEditor, setGlobalEditor] = useState(null);
    const [Tracks, setTracks] = useState([]);
    const [MuteState, setMuteState] = useState(false);
    const [volumeState, setVolumeState] = useState({});
    const [LowPassState, setLowPassState] = useState(0);
    const [MediumPassState, setMediumPassState] = useState(0);
    const [HighPassState, setHighPassState] = useState(0);
    const [RoomState, setRoomState] = useState(0);
    const [RoomLowPassState, setRoomLowPassState] = useState(0);
    const [RoomFadeState, setRoomFadeState] = useState(0);
    const [RoomDecayState, setRoomDecayState] = useState(0);
    const [RoomSustainState, setRoomSustainState] = useState(0);
    const [rngArray, setRngArray] = useState([]);

    // Process text on lood and pulls all the tracks from the song
    // Uses the tracks pulled creates a range for each track to set volume.
    useEffect(() => {
        if (globalEditor) {
            Proc();
            getTrack();
            for (const track in Tracks) {
                Volume(track, 0.5);
            }
        }
    }, [globalEditor]);

    // Pulls the tracks from the song and stores them in an array.
    const getTrack = () => {
        let code = globalEditor.code;
        code = code.split("\n");
        for (const line of code) {
            let match = line.match(/[A-Za-z][_0-9A-Za-z]*:\s?$/);
            if (match) {
                setTracks((currentTracks) => [...currentTracks, match[0].replace(":", "").trim()]);
            }
        }
    };

    const Proc = () => {
        // Check if there is a global editor
        // If no global editor return as the code can't be set
        if (!globalEditor) {
            return;
        }

        // gets the process information to process
        let proc_text = document.getElementById("proc").value;

        // Process mute tag
        let proc_text_replaced = proc_text.replaceAll("<Mute>", ProcessText("Mute", ""));

        // Process volume tag
        proc_text_replaced = proc_text_replaced.replaceAll(
            "<Volume_Control>",
            ProcessText("Volume", "")
        );

        // Process low pass filter tag
        proc_text_replaced = proc_text_replaced.replaceAll(
            "<Low_Pass_Filter>",
            ProcessText("lpf", "")
        );

        // Process medium pass filter tag
        proc_text_replaced = proc_text_replaced.replaceAll(
            "<Medium_Pass_Filter>",
            ProcessText("mpf", "")
        );

        // Process high pass filter tag
        proc_text_replaced = proc_text_replaced.replaceAll(
            "<High_Pass_Filter>",
            ProcessText("hpf", "")
        );

        // Process room filter tag
        proc_text_replaced = proc_text_replaced.replaceAll("<Room>", ProcessText("Room", ""));

        // Process room low pass filter tag
        proc_text_replaced = proc_text_replaced.replaceAll(
            "<Room_Low_Pass>",
            ProcessText("rlp", "")
        );

        // Process Decay tag
        proc_text_replaced = proc_text_replaced.replaceAll("<Decay>", ProcessText("Decay", ""));

        //Process room fade tag
        proc_text_replaced = proc_text_replaced.replaceAll("<Room_Fade>", ProcessText("Fade", ""));

        // Process volume tag for each track
        if (Tracks.length === 0) {
            proc_text_replaced = proc_text_replaced.replaceAll(
                /<([A-Za-z][_0-9A-Za-z]*\s?)_Volume>/g,
                ProcessText("Volume", "")
            );
        } else {
            for (let track of Tracks) {
                console.log(track);
                console.log(`<${track.replace(":", "").trim()}_Volume>`);
                track = track.replace(":", "").trim();
                proc_text_replaced = proc_text_replaced.replace(
                    `<${track}_Volume>`,
                    ProcessText("Volume", `${track}`)
                );
            }
        }

        ProcessText(proc_text);
        globalEditor.setCode(proc_text_replaced);
    };

    //sets the mute state when it changes and processes change
    useEffect(() => {
        Proc();
    }, [MuteState]);

    const ProcessText = (match, track) => {
        // Creating variable to replace tag
        let replace = "";

        // replace mute variable when mute state is changed
        if (MuteState && match === "Mute") {
            replace = "_";
        }

        // updates the all volume tag with the volume state value
        if (volumeState["AllTrackVolume"] && match === "Volume" && track === "") {
            replace = `all(x => x.postgain(${volumeState["AllTrackVolume"]}))`;
        }

        // updates respective track volume with the volume provided by the track volume state
        if (volumeState[track] && match === "Volume") {
            replace = `.postgain(${volumeState[track]})`;
        }

        // updates the all low pass tag with the low pass state value
        if (LowPassState && match === "lpf") {
            replace = `all(x => x.lpf(${LowPassState}))`;
        }

        // updates the all medium pass tag with the medium pass state value
        if (MediumPassState && match === "mpf") {
            replace = `all(x => x.bpf(${MediumPassState}))`;
        }

        // updates the all high pass tag with the high pass state value
        if (HighPassState && match === "hpf") {
            replace = `all(x => x.hpf(${HighPassState}))`;
        }

        // updates the all room tag with the room state value
        if (RoomState && match === "Room") {
            replace = `all(x => x.room(${RoomState}))`;
        }

        // updates the all room low pass tag with the room low pass state value
        if (RoomLowPassState && match === "rlp") {
            replace = `all(x => x.room(${RoomState}).rlp(${RoomLowPassState}))`;
        }

        // updates the all room fade tag with the room fade state value
        if (RoomFadeState && match === "Fade") {
            replace = `all(x => x.room(${RoomState}).rlp(${RoomLowPassState}).rfade(${RoomFadeState}))`;
        }

        // updates the all room decay tag with the room decay state value
        if (RoomDecayState && match === "Decay") {
            replace = `all(x => x.decay(${RoomDecayState}).sustain(${RoomSustainState}))`;
        }

        // updates the all room sustain tag with the room sustain state value
        if (RoomSustainState && match === "Decay") {
            replace = `all(x => x.decay(${RoomDecayState}).sustain(${RoomSustainState}))`;
        }

        return replace;
    };

    // changes the volume when a volume range has been set
    // Processes change
    const Volume = (track, value) => {
        setVolumeState((prevState) => ({
            ...prevState,
            [track]: value,
        }));
        Proc();
    };

    // Creates layout of webpage
    return (
        <div style={{ backgroundColor: "#020a4aff" }}>
            <div className="row" style={{ maxWidth: "100vw", marginRight: "0" }}>
                <div className="col-md-9">
                    <h2 className="ps-3" style={{ color: "#fcef8fff" }}>
                        Strudel Demo
                    </h2>
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label ps-3"
                        style={{ color: "#faa255ff" }}
                    >
                        Text to preprocess:
                    </label>
                </div>
                <div className="col-md-3">
                    <SaveAndLoadButtons
                        MuteState={MuteState}
                        setMuteState={setMuteState}
                        volumeState={volumeState}
                        setVolumeState={setVolumeState}
                        Tracks={Tracks}
                        lowPassState={LowPassState}
                        setLowPassState={setLowPassState}
                        mediumPassState={MediumPassState}
                        setMediumPassState={setMediumPassState}
                        highPassState={HighPassState}
                        setHighPassState={setHighPassState}
                        roomState={RoomState}
                        setRoomState={setRoomState}
                        roomLowPassState={RoomLowPassState}
                        setRoomLowPassState={setRoomLowPassState}
                        roomFadeState={RoomFadeState}
                        setRoomFadeState={setRoomFadeState}
                        roomDecayState={RoomDecayState}
                        setRoomDecayState={setRoomDecayState}
                        roomSustainState={RoomSustainState}
                        SetRoomSustainState={setRoomSustainState}
                    />
                </div>
            </div>
            <main>
                <div className="container-fluid">
                    <div className="row">
                        <div style={{ width: "66.3%" }}>
                            <div className="row">
                                <Processor
                                    setGlobalEditor={setGlobalEditor}
                                    rngArray={rngArray}
                                    setRngArray={setRngArray}
                                />
                            </div>
                            <div className="row ps-3 pt-2">
                                <Strudel />
                            </div>
                        </div>
                        <div
                            style={{
                                width: "33%",
                                backgroundColor: "white",
                                border: "2px solid yellow",
                                overflowY: "auto",
                            }}
                        >
                            <Navigation
                                globalEditor={globalEditor}
                                Proc={Proc}
                                Tracks={Tracks}
                                setLowPassState={setLowPassState}
                                setHighPassState={setHighPassState}
                                setMediumPassState={setMediumPassState}
                                Volume={Volume}
                                MuteState={MuteState}
                                setMuteState={setMuteState}
                            />
                        </div>
                    </div>
                    <div className="row mt-3 pb-3">
                        <div
                            className="ms-3 me-2"
                            style={{
                                width: "64%",
                                backgroundColor: "white",
                                border: "2px solid yellow",
                                marginTop: 0,
                            }}
                        >
                            <Graph rngArray={rngArray} />
                        </div>
                        <div
                            className="ms-1"
                            style={{
                                width: "33%",
                                backgroundColor: "white",
                                border: "2px solid yellow",
                                overflowY: "auto",
                            }}
                        >
                            <div style={{ height: "26vw" }}>
                                <h6 className="text-center mt-2">Reverb:</h6>
                                <Reverb
                                    setRoomState={setRoomState}
                                    Proc={Proc}
                                    setRoomLowPassState={setRoomLowPassState}
                                    setRoomFadeState={setRoomFadeState}
                                    setRoomSustainState={setRoomSustainState}
                                    setRoomDecayState={setRoomDecayState}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
