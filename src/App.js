import './App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch from './console-monkey-patch';
import DJControls from './components/DJControls';
import PlayControls from './components/PlayControls';
import ProcControls from './components/ProcControls';
import PreProTextArea from './components/PreProTextArea';
import { Preprocess } from './utils/PreprocessLogic';

let globalEditor = null;

export default function StrudelDemo() {
  const hasRun = useRef(false);

  const [procText, setProcText] = useState(stranger_tune);   // fixed name
  const [volume, setVolume] = useState(1);
  const [state, setState] = useState("stop");

  const handlePlay = () => {
    const outputText = Preprocess({ inputText: procText, volume });
    if (!globalEditor) return;
    globalEditor.setCode(outputText);
    globalEditor.evaluate();
  };

  const handleStop = () => {
    globalEditor?.stop();
  };

  // react to volume changes while playing
  useEffect(() => {
    if (state === "play") {
      handlePlay();
    }
  }, [volume]); // keep inside the component

  // bootstrap Strudel editor + push code when procText changes first time
  useEffect(() => {
    if (!hasRun.current) {
      document.addEventListener("d3Data", (e) => console.log(e.detail));
      console_monkey_patch();
      hasRun.current = true;

      const canvas = document.getElementById('roll');
      canvas.width *= 2;
      canvas.height *= 2;
      const drawContext = canvas.getContext('2d');
      const drawTime = [-2, 2];

      globalEditor = new StrudelMirror({
        defaultOutput: webaudioOutput,
        getTime: () => getAudioContext().currentTime,
        transpiler,
        root: document.getElementById('editor'),
        drawTime,
        onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
        prebake: async () => {
          initAudioOnFirstClick();
          const loadModules = evalScope(
            import('@strudel/core'),
            import('@strudel/draw'),
            import('@strudel/mini'),
            import('@strudel/tonal'),
            import('@strudel/webaudio'),
          );
          await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
        },
      });
    }

    // keep editor code in sync with procText
    if (globalEditor) {
      globalEditor.setCode(procText);
    }
  }, [procText]); // runs on mount (after hasRun) and when procText changes

  return (
    <div>
      <h2>Strudel Demo</h2>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <PreProTextArea
                value={procText}                              // controlled input
                onChange={(e) => setProcText(e.target.value)} />
            </div>
            <div className="col-md-4">
              <nav>
                <ProcControls
                  onProc={handlePlay}
                  onProcPlay={() => { setState("play"); handlePlay(); }}
                />
                <br />
                <PlayControls
                  onPlay={() => { setState("play"); handlePlay(); }}
                  onStop={() => { setState("stop"); handleStop(); }}
                />
              </nav>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <div id="editor" />
              <div id="output" />
            </div>
            <div className="col-md-4">
              <DJControls
                volumeChange={volume}
                onVolumeChange={(e) => setVolume(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
        <canvas id="roll"></canvas>
      </main>
    </div>
  );
}
