import "./App.css";
import { useEffect, useRef, useState } from "react";

import { initializeStrudel } from "./strudel/strudelSetup";
import { stranger_tune } from "./tunes";
import { Proc } from "./strudel/procLogic";

// import components
import ToggleControls from "./components/ToggleControls";
import Header from "./components/Header";
import StatusBar from "./components/status/StatusBar";
import ControlPanel from "./components/controllers/ControlPanel";
import IOAccordion from "./components/IOAccordion/IOAccordion";

export default function App() {
  const hasRun = useRef(false);
  const [procValue, setProcValue] = useState(stranger_tune);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;

      // Initialize Strudel with stranger_tune
      initializeStrudel(stranger_tune).then(() => {
        // Process the tune immediately after initialization
        Proc();
      });
    }
  }, []);

  // Update the textarea and keep local state in sync
  const handleProcChange = (e) => {
    setProcValue(e.target.value);
  };

  return (
    <div className="bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] min-h-screen text-white p-3">
      <Header />
      <StatusBar isPlaying={isPlaying} />
      <ControlPanel isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <ToggleControls />

      <IOAccordion procValue={procValue} handleProcChange={handleProcChange} />

      <canvas id="roll"></canvas>
    </div>
  );
}
