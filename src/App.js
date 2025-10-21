import "./cors-redirect";
import "./App.css";

import { useEffect, useRef } from "react";

import { stranger_tune } from "./tunes";
import { setupStrudelEditor } from "./strudel/setup";

import { SetupButtons } from "./strudel/buttons";
import { ProcAndPlay } from "./strudel/processor";

export default function StrudelDemo() {
  const hasRun = useRef(false);
  let globalEditor = useRef(null);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      (async () => {
        globalEditor.current = await setupStrudelEditor("editor");

        document.getElementById("proc").value = stranger_tune;

        if (!globalEditor) return;
        SetupButtons(globalEditor.current);

        document
          .getElementById("flexRadioDefault1")
          .addEventListener("change", () => ProcAndPlay(globalEditor.current));
        document
          .getElementById("flexRadioDefault2")
          .addEventListener("change", () => ProcAndPlay(globalEditor.current));
      })();
    }
  }, []);

  return (
    <div>
      <h2>Strudel Demo</h2>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-md-8"
              style={{ maxHeight: "50vh", overflowY: "auto" }}
            >
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Text to preprocess:
              </label>
              <textarea className="form-control" rows="15" id="proc"></textarea>
            </div>
            <div className="col-md-4">
              <nav>
                <button id="process" className="btn btn-outline-primary">
                  Preprocess
                </button>
                <button id="process_play" className="btn btn-outline-primary">
                  Proc & Play
                </button>
                <br />
                <button id="play" className="btn btn-outline-primary">
                  Play
                </button>
                <button id="stop" className="btn btn-outline-primary">
                  Stop
                </button>
              </nav>
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-8"
              style={{ maxHeight: "50vh", overflowY: "auto" }}
            >
              <div id="editor" />
            </div>
            <div className="col-md-4">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  defaultChecked
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  p1: ON
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  p1: HUSH
                </label>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
