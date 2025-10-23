import './cors-redirect';
import './index.css'
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import { ButtonStyle } from './components/buttons/buttonStyle';
import { ListComponents } from './components/Input/listComponents'

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

  const handleProc = () => {
    Proc()
  }

  const handleProcPlay = () => {
    Proc()
    globalEditor.evaluate();
  }

  // Variable to save text.
  const [text, setText] = useState(stranger_tune);

  // Function to save the text song.
  const handleSave = () => {
    console.log(JSON.stringify(text))
    localStorage.setItem("procText", JSON.stringify(text));
    alert("Saved to local storage");
  };

  // Function to load the text song from local storage.
  const handleLoad = () => {
    const savedItem = localStorage.getItem("procText");
    if (savedItem) {
      setText(JSON.parse(savedItem));
      alert("Loaded from local storage");
      console.log(JSON.parse(savedItem));
    } else {
      alert("No saved text found");
    }
  };

  // Function to delete item from the local storage.
  const handleDelete = () => {
    const deletedItem = localStorage.getItem("procText");
    if (deletedItem) {
      localStorage.removeItem("procText")
      alert("remove from local storage");
      console.log(JSON.parse(deletedItem));
    } else {
      alert("No deleted item found");
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="bg-black p-2 mb-2 flex justify-between">
        <div className='flex'>
          <span className={`text-3xl font-bold text-yellow-500 px-1 ${isPlay ? "animate-spin" : ""}`}>꩜</span>
          <h1 className="text-3xl font-bold text-yellow-500">Strudel Demo </h1>
        </div>
        
        <ButtonStyle
        handleDelete={handleDelete} 
        handleSave={handleSave} 
        handleLoad={handleLoad}
        handleProc={handleProc}
        handleProcPlay={handleProcPlay}
        handleStop={handleIsStop}
        handlePlay={handleIsPlay}
        isPlay={isPlay}/>
        
      </div>
      <main>

        <div className="container-fluid">
          <div className='flex'>
            <ListComponents/>
          </div>

          <div>
            <h2 htmlFor="exampleFormControlTextarea1" className="text-2xl text-center font-bold">Text to preprocess</h2>
            <div>
              <textarea 
                className="w-full border border-black" 
                rows="15" 
                id="proc" 
                value={text}
                onChange={(e) => setText(e.target.value)}
                ></textarea>
            </div>
          </div>
          <div>
            <h2 className='mt-2 text-2xl text-center font-bold'> Showtime </h2>
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

