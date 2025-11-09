import "./App.css";
import { useEffect, useState } from "react";
import Processor from "./components/Processor";
import Strudel from "./components/Strudel";
import SaveAndLoadButtons from "./components/SaveAndLoadButtons";
import Reverb from "./components/Reverb";
import Navigation from "./components/Navigation";
import Graph from "./components/Graph";

export default function StrudelDemo() {
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

    useEffect(() => {
        if (globalEditor) {
            Proc();
            getTrack();
            for (const track in Tracks) {
                Volume(track, 0.5);
            }
        }
    }, [globalEditor]);

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
        if (!globalEditor) {
            return;
        }
        console.log(document.getElementById("proc"));
        let proc_text = document.getElementById("proc").value;
        let proc_text_replaced = proc_text.replaceAll("<Mute>", ProcessText("Mute", ""));
        proc_text_replaced = proc_text_replaced.replaceAll(
            "<Volume_Control>",
            ProcessText("Volume", "")
        );
        proc_text_replaced = proc_text_replaced.replaceAll(
            "<Low_Pass_Filter>",
            ProcessText("lpf", "")
        );
        proc_text_replaced = proc_text_replaced.replaceAll(
            "<Medium_Pass_Filter>",
            ProcessText("mpf", "")
        );
        proc_text_replaced = proc_text_replaced.replaceAll(
            "<High_Pass_Filter>",
            ProcessText("hpf", "")
        );
        proc_text_replaced = proc_text_replaced.replaceAll("<Room>", ProcessText("Room", ""));
        proc_text_replaced = proc_text_replaced.replaceAll(
            "<Room_Low_Pass>",
            ProcessText("rlp", "")
        );
        proc_text_replaced = proc_text_replaced.replaceAll("<Decay>", ProcessText("Decay", ""));
        proc_text_replaced = proc_text_replaced.replaceAll("<Room_Fade>", ProcessText("Fade", ""));
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

    useEffect(() => {
        Proc();
    }, [MuteState]);

    const ProcessText = (match, track) => {
        console.log(track);
        let replace = "";
        console.log(MuteState);
        if (MuteState && match === "Mute") {
            replace = "_";
        }
        if (volumeState["AllTrackVolume"] && match === "Volume" && track === "") {
            replace = `all(x => x.postgain(${volumeState["AllTrackVolume"]}))`;
        }
        if (volumeState[track] && match === "Volume") {
            replace = `.postgain(${volumeState[track]})`;
        }
        if (LowPassState && match === "lpf") {
            replace = `all(x => x.lpf(${LowPassState}))`;
        }
        if (MediumPassState && match === "mpf") {
            replace = `all(x => x.bpf(${MediumPassState}))`;
        }
        if (HighPassState && match === "hpf") {
            replace = `all(x => x.hpf(${HighPassState}))`;
        }
        if (RoomState && match === "Room") {
            replace = `all(x => x.room(${RoomState}))`;
        }
        if (RoomLowPassState && match === "rlp") {
            replace = `all(x => x.room(${RoomState}).rlp(${RoomLowPassState}))`;
        }
        if (RoomFadeState && match === "Fade") {
            replace = `all(x => x.room(${RoomState}).rlp(${RoomLowPassState}).rfade(${RoomFadeState}))`;
        }
        if (RoomDecayState && match === "Decay") {
            replace = `all(x => x.decay(${RoomDecayState}).sustain(${RoomSustainState}))`;
        }
        if (RoomSustainState && match === "Decay") {
            replace = `all(x => x.decay(${RoomDecayState}).sustain(${RoomSustainState}))`;
        }

        return replace;
    };

    const Volume = (track, value) => {
        setVolumeState((prevState) => ({
            ...prevState,
            [track]: value,
        }));
        Proc();
    };

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
                    <SaveAndLoadButtons MuteState={MuteState} setMuteState={setMuteState} />
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
