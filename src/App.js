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
import LpfSelect from './components/LpfSelect';

let globalEditor = null;

export default function StrudelDemo() {
  const hasRun = useRef(false);

  const [procText, setProcText] = useState(stranger_tune);   // fixed name
  const [volume, setVolume] = useState(1);
  const [state, setState] = useState("stop");
  const [cpm, setCpm] = useState(120);
  const [lpf, setLpf] = useState(null);

  const handlePlay = () => {
    const outputText = Preprocess({ inputText: procText, volume, cpm });
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

    // Re-run whenever text or control values change

   if (!globalEditor) return; //editor not ready yet

     //Build final Strudel code w upd settings
  const code = Preprocess({ inputText: procText, volume, cpm, lpf });
  if (state === "play") {

    //realtime update while playing
    globalEditor.setCode(code);
    globalEditor.evaluate();
  } else {

    //update editor text
    globalEditor.setCode(code);
  }
}, [procText, volume, cpm, lpf, state]);


return (
  <div className="app-root">
    <header className="app-header container-fluid">
      <h1 className="app-title">Strudel Demo</h1>
    </header>

    <main className="app-main container-fluid">


      <div className="row section-top">
        <div className="col-md-8 panel panel-preproc">
          <PreProTextArea
            value={procText}
            onChange={(e) => setProcText(e.target.value)}
          />
        </div>

        <div className="col-md-4 panel panel-actions">
          <nav className="action-grid">
            <ProcControls
              onProc={handlePlay}
              onProcPlay={() => { setState("play"); handlePlay(); }}
            />
            <PlayControls
              onPlay={() => { setState("play"); handlePlay(); }}
              onStop={() => { setState("stop"); handleStop(); }}
            />
          </nav>
        </div>
      </div>

    
      <div className="row section-bottom">
        <div className="col-md-8 panel panel-editor">
          <div id="editor" />
          <div id="output" />
        </div>

        <div className="col-md-4 panel panel-controls">
          <DJControls
            cpmValue={cpm}
            onCpmChange={(e) => setCpm(Number(e.target.value))}
            volumeChange={volume}
            onVolumeChange={(e) => setVolume(Number(e.target.value))}
          />
          <LpfSelect value={lpf} onChange={setLpf} />
        </div>
      </div>

      <canvas id="roll"></canvas>
    </main>
  </div>
);
}