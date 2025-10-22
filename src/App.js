import "./App.css";
import { useEffect, useRef } from "react";
import { intializeStrudel } from "./strudel/strudelSetup";
import { stranger_tune } from "./tunes";
import { Proc } from "./strudel/procLogic";
import ControlButtons from "./components/ControlButtons";
import ToggleControls from "./components/ToggleControls";

export default function App() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;

      intializeStrudel(stranger_tune).then(() => {
        document.getElementById("proc").value = stranger_tune;

        // Process so that when clicking play, it doesn't need to be processed anymore
        Proc();
      });
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
              <ControlButtons />
            </div>
          </div>
          <div className="row">
            <div
              className="col-md-8"
              style={{ maxHeight: "50vh", overflowY: "auto" }}
            >
              <div id="editor" />
              <div id="output" />
            </div>
            <div className="col-md-4">
              <ToggleControls />
            </div>
          </div>
        </div>
        <canvas id="roll"></canvas>
      </main>
    </div>
  );
}
