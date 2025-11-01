import "./App.css";
import { useEffect, useState } from "react";
import VolumeControl from "./components/VolumeControl";
import ProcessingButtons from "./components/ProcessingButtons";
import PlayButtons from "./components/PlayButtons";
import Processor from "./components/Processor";
import Strudel from "./components/Strudel";
import SaveAndLoadButtons from "./components/SaveAndLoadButtons";
import LowPassFilter from "./components/LowPassFilter";
import MediumPassFilter from "./components/MediumPassFilter";
import HighPassFilter from "./components/HighPassFilter";
import Track from "./components/Track";
import Reverb from "./components/Reverb";

export default function StrudelDemo() {
    const [globalEditor, setGlobalEditor] = useState(null);
    const [Tracks, setTracks] = useState([]);
    const [MuteState, setMuteState] = useState(false);
    const [volumeState, setVolumeState] = useState({});
    const [LowPassState, setLowPassState] = useState(0);
    const [MediumPassState, setMediumPassState] = useState(0);
    const [HighPassState, setHighPassState] = useState(0);

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

    const ProcessText = (match, track) => {
        console.log(track);
        let replace = "";
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

        return replace;
    };

    // const ProcAndPlay = () => {
    //     console.log(globalEditor.repl.state.started);
    //     if (globalEditor != null) {
    //         console.log(globalEditor);
    //         Proc();
    //         globalEditor.evaluate();
    //     }
    // };

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
                                <Processor Proc={Proc} setGlobalEditor={setGlobalEditor} />
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
                            <nav className="row w-100 " style={{ maxHeight: "100vh" }}>
                                <ProcessingButtons globalEditor={globalEditor} Proc={Proc} />
                                <br />
                                <PlayButtons globalEditor={globalEditor} />
                                <br />
                                <h6 className="text-center">Volume Controls:</h6>
                                <VolumeControl
                                    Proc={Proc}
                                    MuteState={MuteState}
                                    setMuteState={setMuteState}
                                    Volume={Volume}
                                />
                                <br />
                                <h6 className="text-center">Track Volume Control:</h6>
                                {Array.from(
                                    { length: Tracks.length },
                                    (_, i) => (
                                        <Track trackName={Tracks[i]} Volume={Volume} />
                                    ),
                                    <br />
                                )}
                                <h6 className="text-center">Filters:</h6>
                                <LowPassFilter setLowPassState={setLowPassState} Proc={Proc} />
                                <br />
                                <MediumPassFilter
                                    setMediumPassState={setMediumPassState}
                                    Proc={Proc}
                                />
                                <br />
                                <HighPassFilter setHighPassState={setHighPassState} Proc={Proc} />
                            </nav>
                        </div>
                    </div>
                    <div className="row mt-3 pb-3">
                        <div style={{ width: "66.3%" }}></div>
                        <div
                            style={{
                                width: "33%",
                                backgroundColor: "white",
                                border: "2px solid yellow",
                            }}
                        >
                            <div style={{ height: "26vw" }}>
                                <h6 className="text-center mt-2">Reverb:</h6>
                                <Reverb />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <canvas id="roll"></canvas> */}
            </main>
        </div>
    );
}
