import "./App.css";
import { useEffect, useRef } from "react";
import { initializeStrudel } from "./strudel/strudelSetup";
import { stranger_tune } from "./tunes";
import { Proc } from "./strudel/procLogic";
import ToggleControls from "./components/ToggleControls";
import Header from "./components/Header";
import StatusBar from "./components/status/StatusBar";
import ControlPanel from "./components/controllers/ControlPanel";

export default function App() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;

      initializeStrudel(stranger_tune).then(() => {
        document.getElementById("proc").value = stranger_tune;

        // Process so that when clicking play, it doesn't need to be processed anymore
        Proc();
      });
    }
  }, []);

  return (
    <div className="bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] min-h-screen text-white p-3">
      <Header />

      <StatusBar />

      <ControlPanel />

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
