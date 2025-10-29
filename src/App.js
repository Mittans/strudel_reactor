import './cors-redirect';
import './index.css'
import { initStrudel, note, hush, evalScope, getAudioContext, webaudioOutput, registerSynthSounds, initAudioOnFirstClick, transpiler } from "@strudel/web";
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import { ControlButtons } from './components/buttons/ControlButtons';
import { CRUDManager } from './components/buttons/CRUDManager';
import { ListInputs } from './components/input/listInputs';
import SaveModal from './components/modal/saveModal'

let globalEditor = null;

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

export function getAllMusic(){
  const musicList = [];
  for (let i = 0; i < localStorage.length; i++) {
    const musicSong = localStorage.key(i);
    if (musicSong !== "codemirror-settings") {
      musicList.push(musicSong);
    }
    
  }

  return musicList
}

export default function StrudelDemo() {

  const hasRun = useRef(false);
  const [isPlay,setIsPlay] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [musicList, setMusicList] = useState([]);

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
      setMusicList(getAllMusic())
    }
  
  }, []);

  const handlePlay = () => {
    const editorValue = document.getElementById("proc").value;
    if (globalEditor != null && editorValue != "") {
      setIsPlay(true);
      globalEditor.evaluate();
    } else{
      alert("You should write the code in the box to play the music")
    }
  }

  const handleStop = () => {
    setIsPlay(false);
    globalEditor.stop()
  }

  const handleProc = () => {
    Proc()
  }

  const handleProcPlay = () => {
    const editorValue = document.getElementById("proc").value;
    if (globalEditor != null && editorValue != "") {
      setIsPlay(true)
      Proc()
      globalEditor.evaluate()
    }
    else{
      alert("You should write the code in the box to play the music")
    }
  }

  const modalOpenControl = () => {
    setIsOpenModal(true);
  }

  const modalCloseControl = () => {
    setIsOpenModal(false);
  }
  // Variable to save text.
  const [text, setText] = useState(stranger_tune);

  // Function to load the text song from local storage.
  const handleLoad = () => {
    const song = document.getElementById("songName").value
    const savedItem = localStorage.getItem(song);

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
    const song = document.getElementById("songName").value;
    const deletedItem = localStorage.getItem(song);
    if (deletedItem) {
      localStorage.removeItem(song);
      alert("remove from local storage");
      console.log(JSON.parse(deletedItem));
    } else {
      alert("No deleted item found");
    }

    window.location.reload(); 
  };

  return (
    <div className="bg-gray-100">
      <div name="components-bar" className="bg-black p-2 mb-2 flex justify-between">

        {/* The title */}
        <div className='flex'>
          <span className={`text-3xl font-bold text-yellow-500 px-1 ${isPlay ? "animate-spin" : ""}`}>꩜</span>
          <h1 className="text-3xl font-bold text-yellow-500">Strudel Demo </h1>
        </div>
        
        {/* The control buttons */}
        <div name="buttons">
          <ControlButtons
          handleProc={handleProc}
          handleProcPlay={handleProcPlay}
          handleStop={handleStop}
          handlePlay={handlePlay}
          isPlay={isPlay}/>
        </div>

        {/* The Saving Modal appears after clicking save button */}
        {isOpenModal && (
        <SaveModal modalCloseControl={modalCloseControl} text={text}/>
        )}
      </div>

      <main>
        <div className="container-fluid">
          <div>
            <div className='flex justify-between mb-2'>
              <div className='flex'>
                <select
                className="text-2xl text-center font-bold bg-gray-200 text-black w-40  rounded-lg" 
                htmlFor="exampleFormControlTextarea1" 
                id="songName"
                >
                  <option value ="" className="text-sm text-center font-bold bg-gray-200 text-black w-40 rounded-lg" > Untitled </option>
                  {musicList.map((obj) => (
                      <option 
                      className="text-sm text-center font-bold bg-gray-200 text-black w-40 rounded-lg"
                      value={obj}> 
                      {obj} 
                      </option>
                  ))}
                </select>
              
                <CRUDManager  
                handleDelete={handleDelete} 
                modalOpenControl={modalOpenControl} 
                handleLoad={handleLoad}
                />
              </div>
              
              <ListInputs/>
            </div>
            <div className='flex'>
              <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                <label className="peer-checked:bg-gray-500 bg-gray-400 text-white rounded-md px-5 py-2 font-bold" htmlFor="flexRadioDefault1">
                  p1: ON
                </label>
              </div>
              <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                <label className="peer-checked:bg-gray-500 bg-gray-400 text-white rounded-md px-5 py-2 font-bold" htmlFor="flexRadioDefault2">
                  p1: HUSH
                </label>
              </div>
            </div>
            <div className='flex justify-between'>
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
          </div>
          <div className=''>
            <div className="h-500" style={{ maxHeight: '500', overflowY: 'auto' }}>
              <div id="editor" />
            </div>
          </div>
        </div>

      </main >
    </div >
  );


}

