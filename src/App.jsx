import "./App.css";

import { stranger_tune } from "./tunes";

import { useStrudel } from "./hooks/useStrudel";

// import components
import Header from "./components/Header";
import StatusBar from "./components/status/StatusBar";
import ControlPanel from "./components/controllers/ControlPanel";
import IOAccordion from "./components/IOAccordion/IOAccordion";
import MixerPanel from "./components/controllers/MixerPanel";
import PatternPanel from "./components/controllers/PatternPanel";
import BassPanel from "./components/controllers/BassPanel";
import InstrumentsPanel from "./components/controllers/InstrumentsPanel";
import EffectPanel from "./components/controllers/EffectPanel";

export default function App() {
  const {
    isReady,
    isPlaying,
    setIsPlaying,
    bpm,
    volume,
    procValue,
    setProcValue,
    handleProcChange,
    changeTempo,
    changeVolume,
    changeGainPattern,
    changeBass,
    changeReverb,
    reverb,
    changeInstrumentsCombination,
    toggleRandomHits,
    toggleShapeValue,
    toggleBitReduction,
    isRandomHitsOn,
    isShapeValueOn,
    isCrushValueOn,
    loadFromLocalStorage,
    saveToLocalStorage,
  } = useStrudel(stranger_tune);

  return (
    <div className="bg-gradient-to-br from-[#1e3a8a] via-[#3b82f6] to-[#06b6d4] min-h-screen text-white p-3">
      <div className="w-full max-w-7xl mx-auto">
        <Header
          loadFromLocalStorage={loadFromLocalStorage}
          saveToLocalStorage={saveToLocalStorage}
        />
        <StatusBar isPlaying={isPlaying} bpm={bpm} volume={volume} />
        <ControlPanel isPlaying={isPlaying} setIsPlaying={setIsPlaying} />

        {isReady && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <MixerPanel
                  volume={volume}
                  bpm={bpm}
                  reverb={reverb}
                  onVolumeChange={changeVolume}
                  onTempoChange={changeTempo}
                  onReverbChange={changeReverb}
                />
              </div>
              <div>
                <PatternPanel changeGainPattern={changeGainPattern} />
              </div>
              <div>
                <BassPanel changeBass={changeBass} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <InstrumentsPanel
                  onInstrumentChange={changeInstrumentsCombination}
                />
              </div>
              <div>
                <EffectPanel
                  toggleRandomHits={toggleRandomHits}
                  toggleShapeValue={toggleShapeValue}
                  toggleBitReduction={toggleBitReduction}
                  isRandomHitsOn={isRandomHitsOn}
                  isShapeValueOn={isShapeValueOn}
                  isCrushValueOn={isCrushValueOn}
                />
              </div>
            </div>
          </>
        )}
        {/* <ToggleControls /> */}
        <IOAccordion
          procValue={procValue}
          handleProcChange={handleProcChange}
        />
      </div>
    </div>
  );
}
