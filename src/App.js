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
//import ProcControls from './components/ProcControls';
import PreProTextArea from './components/PreProTextArea';
import { Preprocess } from './utils/PreprocessLogic';
import LpfSelect from './components/LpfSelect'; 
import D3Graph from './components/D3Graph';
import TextJsonControls from "./components/TextJsonControls";

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



  //bootstrap Strudel editor + push code when procText changes first time
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

    //re-run whenever text or control values change
   if (!globalEditor) return; //editor not ready yet

     //build final Strudel code w upd settings
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

const fileInputRef = useRef(null);

//save only the Strudel code text
const handleSaveText = () => {
  const preset = { procText };
  const json = JSON.stringify(preset, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "strudel-text.json";
  a.click();

  URL.revokeObjectURL(url);
};

//trigger file input
const handleLoadClick = () => {
  if (fileInputRef.current) {
    fileInputRef.current.value = ""; // allow reloading same file
    fileInputRef.current.click();
  }
};

//load JSON and apply text
const handlePresetFileChange = (e) => {
  const file = e.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);

      if (typeof data.procText === "string") {
        setProcText(data.procText);   // <-- loads text into editor
      } else {
        alert("JSON missing procText");
      }
    } catch (err) {
      alert("Invalid JSON file");
    }
  };

  reader.readAsText(file);
};

return (
  <div className="app-root">
    <header className="app-header container-fluid">
      <h1 className="app-title">Web Tech Beats</h1>
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
            <PlayControls
              onPlay={() => { setState("play"); handlePlay(); }}
              onStop={() => { setState("stop"); handleStop(); }}
            />
          </nav>
          <D3Graph title="Live Level" height={240} yDomain={[0, 1]} />
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
          onVolumeChange={(e) => {
            const val = Number(e.target.value);
            setVolume(val);
            //stream volume to the chart
            window.dispatchEvent(new CustomEvent("d3Data", { detail: val }));
    }}
  />
          
          <LpfSelect value={lpf} onChange={setLpf} />
          
          <TextJsonControls
    procText={procText}           
    onLoadText={setProcText}    
  />
          
        </div>
      </div>

      <canvas id="roll"></canvas>
    </main>
  </div>
);
}