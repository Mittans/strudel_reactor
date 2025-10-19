import './cors-redirect';
import './App.css';
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import {Play, Stop, ProPlay, Process} from './Buttons/Buttons';

let globalEditor = null;

export function SetupButtons() {
  document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
  document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
  document.getElementById('process').addEventListener('click', () => {
    Proc()
  }
  )
  document.getElementById('process_play').addEventListener('click', () => {
    if (globalEditor != null) {
      Proc()
      globalEditor.evaluate()
    }
  }
  )
}

export function ProcAndPlay() {
  if (globalEditor != null && globalEditor.repl.state.started == true) {
    console.log(globalEditor)
    Proc()
    globalEditor.evaluate();
  }
}

export function Proc() {
  let proc_text = document.getElementById("proc").value;
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
      SetupButtons()
    }

  }, []);


  return (
    <div>
      <div className="bg-success p-2 mb-2">
        <h1 className="text-white"> Strudel Demo </h1>
      </div>
      <main>

        <div className="container-fluid">
          <div>
            <nav className="d-flex justify-content-end">
              <div className="p-2">
                <Process id="process"></Process>
              </div>
              <div className="p-2">
                <ProPlay id="process_play"></ProPlay>
              </div>
              <div className="p-2">
                <Play id="play"></Play>
              </div>
              <div className="p-2">
                  <Stop id="stop"></Stop>
              </div>
            </nav>
          </div>
          <div>
            <h2 htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess</h2>
            <div style={{ maxHeight: '50vh', overflowY: 'auto', maxWidth: 'max' }}>
              <textarea className="form-control" rows="15" id="proc" ></textarea>
            </div>
          </div>
          <div>
            <h2 className='mt-2'> Showtime </h2>
            <div className='d-flex'>
              <div className="form-check m-2">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                <label className="form-check-label btn btn-dark" htmlFor="flexRadioDefault1">
                  p1: ON
                </label>
              </div>
              <div className="form-check m-2">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                <label className="form-check-label btn btn-dark" htmlFor="flexRadioDefault2">
                  p1: HUSH
                </label>
              </div>
            </div>
          </div>
          <div style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <div id="editor" />
          </div>
        </div>

      </main >
    </div >
  );


}

