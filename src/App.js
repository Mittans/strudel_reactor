import "./App.css";
import { useEffect, useRef, useState } from "react";
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

export default function StrudelDemo() {
    const [globalEditor, setGlobalEditor] = useState(null);
    const [Tracks, setTracks] = useState([]);

    useEffect(() => {
        if (globalEditor) {
            Proc();
            getTrack();
        }
    }, [globalEditor]);

    const getTrack = () => {
        let code = globalEditor.code;
        code = code.split("\n");
        for (const line of code) {
            let match = line.match(/^\s*(\w+):/);
            if (match) {
                setTracks((currentTracks) => [...currentTracks, match[1]]);
            }
        }
    };

    const Proc = () => {
        console.log(document.getElementById("proc"));
        let proc_text = document.getElementById("proc").value;
        let proc_text_replaced = proc_text.replaceAll("<main_arp_mute>", ProcessText);
        ProcessText(proc_text);
        globalEditor.setCode(proc_text_replaced);
    };

    const ProcessText = (match, ...args) => {
        let replace = "";
        console.log(document.getElementById("MuteSwitch").checked);
        if (document.getElementById("MuteSwitch").checked) {
            replace = "_";
        }

        return replace;
    };

    const ProcAndPlay = () => {
        console.log(globalEditor.repl.state.started);
        // if (globalEditor != null && globalEditor.repl.state.started == true) {
        if (globalEditor != null) {
            console.log(globalEditor);
            Proc();
            globalEditor.evaluate();
        }
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
                    <SaveAndLoadButtons globalEditor={globalEditor} />
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
                                <VolumeControl Proc={Proc} />
                                <br />
                                <h6 className="text-center">Track Volume Control:</h6>
                                {Array.from(
                                    { length: Tracks.length },
                                    (_, i) => (
                                        <Track trackName={Tracks[i]} />
                                        // <p>{Tracks[i]}</p>
                                    ),
                                    <br />
                                )}
                                <h6 className="text-center">Filters:</h6>
                                <LowPassFilter />
                                <br />
                                <MediumPassFilter />
                                <br />
                                <HighPassFilter />
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
                            <div style={{ height: "25vw" }}>
                                <h6 className="text-center mt-2">Reverb:</h6>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <canvas id="roll"></canvas> */}
            </main>
        </div>
    );
}
