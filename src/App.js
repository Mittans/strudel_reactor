import './cors-redirect';
import './index.css'
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import {Save, Play, Stop, ProPlay, Process} from './Buttons/Buttons';

let globalEditor = null;

export function SetupButtons() {
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
  const [isPlay,setIsPlay] = useState(false);

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

  const handleIsPlay = () => {
    setIsPlay(true);
    globalEditor.evaluate();
  }

  const handleIsStop = () => {
    setIsPlay(false);
    globalEditor.stop()
  }


  return (
    <div>
      <div className="bg-blue-700 p-2 mb-2 flex justify-between">
        <h1 className="text-3xl font-bold text-white"> Strudel Demo </h1>
        <div>
            <nav className="flex justify-end">
              <div className="p-2">
                <Save id="save"/>
              </div>
              <div className="p-2">
                <Process id="process"></Process>
              </div>
              <div className="p-2">
                <ProPlay id="process_play" handlePlay={handleIsPlay}></ProPlay>
              </div>
              {isPlay ? (
              <div className="p-2">
                  <Stop id="stop" handleStop={handleIsStop}></Stop>
              </div>
              ) : (
              <div className="p-2">
                <Play id="play" handlePlay={handleIsPlay}></Play>
              </div>
              )}
            </nav>
          </div>
      </div>
      <main>

        <div className="container-fluid">
          <div>
            <h2 htmlFor="exampleFormControlTextarea1" className="text-2xl">Text to preprocess</h2>
            <div>
              <textarea className="w-full border border-black" rows="15" id="proc" ></textarea>
            </div>
          </div>
          <div>
            <h2 className='mt-2 text-2xl'> Showtime </h2>
            <div className='flex'>
              <div className="m-2">
                <input className="" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                <label className="" htmlFor="flexRadioDefault1">
                  p1: ON
                </label>
              </div>
              <div className="m-2">
                <input type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                <label htmlFor="flexRadioDefault2">
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

