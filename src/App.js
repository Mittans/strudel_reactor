import "./App.css";
import { useEffect, useRef, useState } from "react";
import VolumeControl from "./components/VolumeControl";
import ProcessingButtons from "./components/ProcessingButtons";
import PlayButtons from "./components/PlayButtons";
import Processor from "./components/Processor";
import Strudel from "./components/Strudel";
import SaveAndLoadButtons from "./components/SaveAndLoadButtons";

export default function StrudelDemo() {
    const [globalEditor, setGlobalEditor] = useState(null);

    useEffect(() => {
        if (globalEditor) {
            Proc();
        }
    }, [globalEditor]);

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
            <div className="row">
                <div className="col-md-9">
                    <h2 className="ps-2" style={{ color: "#fcef8fff" }}>
                        Strudel Demo
                    </h2>
                    <label
                        htmlFor="exampleFormControlTextarea1"
                        className="form-label ps-2"
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
                            }}
                        >
                            <nav className="row w-100 ">
                                <ProcessingButtons globalEditor={globalEditor} Proc={Proc} />
                                <br />
                                <PlayButtons globalEditor={globalEditor} />
                                <br />
                                <VolumeControl ProcAndPlay={ProcAndPlay} />
                            </nav>
                        </div>
                    </div>
                </div>
                <canvas id="roll"></canvas>
            </main>
        </div>
    );
}
