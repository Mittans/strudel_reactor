import './cors-redirect';
import './App.css';
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import Controls from "./components/controls"; // Importing the nessesary buttons
import P1Toggle from "./components/p1toggle"; // Importing p1toggle comp
import P2Toggle from "./components/p2toggle"; // Importing p2toggle comp

import { FaVolumeUp } from "react-icons/fa"; // Useful for button icons




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

    // Replace both placeholders independently
    let proc_text_replaced = proc_text
        .replaceAll('<p1_Radio>', ProcessText('p1'))
        .replaceAll('<p2_Radio>', ProcessText('p2'));

    globalEditor.setCode(proc_text_replaced)
}

export function ProcessText(radio) {

  let replace = ""
    if (radio === "p1" && document.getElementById('flexRadioDefault2')?.checked) {
        replace = "_"; // mute P1
    }

    if (radio === "p2" && document.getElementById('flexRadioP2Default2')?.checked) {
        replace = "_"; // mute P2
    }

  return replace
}

// Replays the tune: stop current playback, then restart from the beginning
export async function Replay() {
    if (!globalEditor) return;

    try { initAudioOnFirstClick(); } catch (e) { }

    // Stop any current playback cleanly
    if (globalEditor.repl?.state?.started && globalEditor.stop) {
        console.log("Stopping current playback...");
        await globalEditor.stop();
    }

    // Wait briefly to ensure the stop finishes
    await new Promise((resolve) => setTimeout(resolve, 250));

    // Reprocess the code (in case user changed tune text)
    Proc();

    // Restart playback
    console.log("Restarting playback...");
    globalEditor.evaluate();
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
                          <Controls
                              onProcess={() => Proc()}
                              onProcPlay={() => ProcAndPlay()}
                              replay={() => Replay()}
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
                          <P2Toggle onChange={() => ProcAndPlay()} />
                         
                          <div style={{ marginTop: "1rem" }}>
                              <button
                                  onClick={() => {
                                      const slider = document.getElementById("gainControl");
                                      slider.style.display =
                                          slider.style.display === "none" ? "block" : "none";
                                  }}
                              >
                                  <FaVolumeUp />
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
                                      const value = parseFloat(e.target.value);
                                      const procArea = document.getElementById("proc");
                                      let text = procArea.value;

                                      // Update gain for p1 (if it exists)
                                      if (/p1:/.test(text)) {
                                          text = text.replace(/(p1:[\s\S]*?\.gain\()[^)]+(\))/, `$1${value}$2`);
                                      }

                                      // Update gain for p2 (if it exists)
                                      if (/p2:/.test(text)) {
                                          text = text.replace(/(p2:[\s\S]*?\.gain\()[^)]+(\))/, `$1${value}$2`);
                                      }

                                      procArea.value = text;
                                      ProcAndPlay(); // apply and play immediately
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

