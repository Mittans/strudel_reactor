import './cors-redirect';
import './App.css';
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import Transport from "./components/controls"; // Importing the nessesary buttons
import P1Toggle from "./components/p1toggle"; // Importing p1toggle comp



let globalEditor = null;




//export function SetupButtons() {

//  document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//  document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//  document.getElementById('process').addEventListener('click', () => {
//    Proc()
//  }
//  )
//  document.getElementById('process_play').addEventListener('click', () => {
//    if (globalEditor != null) {
//      Proc()
//      globalEditor.evaluate()
//    }
//  }
//  )
//}



export function ProcAndPlay() {
  if (globalEditor != null && globalEditor.repl.state.started === true) {
    console.log(globalEditor)
    Proc()
    globalEditor.evaluate();
  }
}

export function Proc() {

  let proc_text = document.getElementById('proc').value
  let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
  ProcessText(proc_text);
  globalEditor.setCode(proc_text_replaced)
}

export function ProcessText(match, ...args) {

  let replace = ""
  if (document.getElementById('flexRadioDefault2').checked) {
    replace = "_"
  }

  return replace
}

export default function StrudelDemo() {

  const hasRun = useRef(false);

  useEffect(() => {

    if (!hasRun.current) {
      hasRun.current = true;
      (async () => {
        await initStrudel();

        globalEditor = new StrudelMirror({
          defaultOutput: webaudioOutput,
          getTime: () => getAudioContext().currentTime,
          transpiler,
          root: document.getElementById('editor'),
          prebake: async () => {
            initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
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
        Proc()
      })();
      document.getElementById('proc').value = stranger_tune
    }

  }, []);


  return (
    <div>
      <h2>Strudel Demo</h2>
      <main>

        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
              <textarea className="form-control" rows="15" id="proc" ></textarea>
            </div>
                      <div className="col-md-4">
                          <Transport
                              onProcess={() => Proc()}
                              onProcPlay={() => ProcAndPlay()}
                              onPlay={() => globalEditor && globalEditor.evaluate()}
                              onStop={() => globalEditor && globalEditor.stop()}
                          />
            </div>
          </div>
          <div className="row">
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
              <div id="editor" />
            </div>
            <div className="col-md-4">
                          <P1Toggle onChange={() => ProcAndPlay()} />
                          <div style={{ marginTop: "1rem" }}>
                              <label htmlFor="gainControl" className="form-label">
                                  Volume
                              </label>
                              <input
                                  id="gainControl"
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.05"
                                  defaultValue="0.3"
                                  className="form-range"
                                  onChange={(e) => {
                                      const procArea = document.getElementById("proc");
                                      // replace the existing .gain() value in stranger_tune in tunes with the new one
                                      procArea.value = procArea.value.replace(/\.gain\([^)]*\)/, `.gain(${e.target.value})`);
                                      ProcAndPlay(); // reprocess and play so you hear the change
                                  }}
                              />
                          </div>
                          <div style={{ marginTop: "1rem" }}>
                              <button
                                  onClick={() => {
                                      const slider = document.getElementById("gainControl");
                                      slider.style.display =
                                          slider.style.display === "none" ? "block" : "none";
                                  }}
                              >
                                  🔊
                              </button>

                              <input
                                  id="gainControl"
                                  type="range"
                                  min="0"
                                  max="1"
                                  step="0.05"
                                  defaultValue="0.3"
                                  className="form-range"
                                  style={{ display: "none" }}
                                  onChange={(e) => {
                                      const procArea = document.getElementById("proc");
                                      procArea.value = procArea.value.replace(
                                          /\.gain\([^)]*\)/,
                                          `.gain(${e.target.value})`
                                      );
                                      ProcAndPlay();
                                  }}
                              />
                          </div>

    
            </div>
          </div>
        </div>
      </main >
    </div >
  );


}

