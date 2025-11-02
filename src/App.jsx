import "./App.css";

import { stranger_tune } from "./tunes";

import { useStrudel } from "./hooks/useStrudel";

// import components
import ToggleControls from "./components/ToggleControls";
import Header from "./components/Header";
import StatusBar from "./components/status/StatusBar";
import ControlPanel from "./components/controllers/ControlPanel";
import IOAccordion from "./components/IOAccordion/IOAccordion";
import MixerPanel from "./components/controllers/MixerPanel";
import PatternPanel from "./components/controllers/PatternPanel";
import BassPanel from "./components/controllers/BassPanel";

export default function App() {
  const {
    isReady,
    isPlaying,
    setIsPlaying,
    bpm,
    volume,
    procValue,
    handleProcChange,
    changeTempo,
    changeVolume,
    changeGainPattern,
    changeBass,
    changeReverb,
    reverb,
  } = useStrudel(stranger_tune);

  return (
    <div className="bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] min-h-screen text-white p-3">
      <Header />
      <StatusBar isPlaying={isPlaying} bpm={bpm} volume={volume} />
      <ControlPanel isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

      {isReady && (
        <div className="row">
          <div className="col-4">
            <MixerPanel
              volume={volume}
              bpm={bpm}
              reverb={reverb}
              onVolumeChange={changeVolume}
              onTempoChange={changeTempo}
              onReverbChange={changeReverb}
            />
          </div>
          <div className="col-4">
            <PatternPanel changeGainPattern={changeGainPattern} />
          </div>
          <div className="col-4">
            <BassPanel changeBass={changeBass} />
          </div>
        </div>
      )}
      {/* <ToggleControls /> */}
      <IOAccordion procValue={procValue} handleProcChange={handleProcChange} />
      <canvas id="roll"></canvas>
    </div>
  );
}
