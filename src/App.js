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
import { ControlButtons } from './components/controllers/ControlButtons';
import { SlideInputs } from './components/input/SlideInputs';
import {Effects} from './components/input/Effects';
import SaveModal from './components/modal/saveModal';
import { Instrument } from './components/input/Instrument';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import { SongNameController } from './components/controllers/SongNameController';
import { ButtonShowController } from './components/controllers/ButtonShowController';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

export function ProcAndPlay() {
  if (globalEditor != null && globalEditor.repl.state.started == true) {
    console.log(globalEditor)
    Proc()
    globalEditor.evaluate();
  }
}

export function Proc() {
  let proc_text = document.getElementById("proc").value;
  let proc_text_replaced = proc_text.replaceAll('<Radio>', ProcessText);
  ProcessText(proc_text);
  globalEditor.setCode(proc_text_replaced)
}

export function ProcessText(match, ...args) {
  let replace = "arpeggiator1"
  if (document.getElementById('flexRadioDefault2').checked) {
    replace = "arpeggiator2"
  }
  return replace
}

export default function StrudelDemo() {

  /* Function updated the volume */
  function updateGainInCode(newGain) {
  const procText = document.getElementById("proc").value;

  // Replace all existing .gain(number)
  const updatedText = procText.replace(/\.gain\(\s*[\d.]+\s*\)/g, `.gain(${newGain})`);

  document.getElementById("proc").value = updatedText;
  globalEditor.setCode(updatedText);
  setText(updatedText);
  ProcAndPlay();
}

  /* Function updated the Speed*/
  function updateSpeedInCode(newSpeed) {
  const procText = document.getElementById("proc").value;

  // Replace all existing setcps(speed number)
  const updatedText = procText.replace( /setcps\([^)]*\)/, `setcps(${newSpeed})`);

  document.getElementById("proc").value = updatedText;
  globalEditor.setCode(updatedText);
  setText(updatedText);
  ProcAndPlay();
}

  function updateEditor(newText) {
    setText(newText);
    if (globalEditor) globalEditor.setCode(newText);
  }


  const hasRun = useRef(false);
  const [isPlay,setIsPlay] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    if (!hasRun.current) {
        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;
        //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            //init canvas
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            globalEditor = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
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
          }
          Proc();
      });

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
  const [isOnHush,setIsOnHush] = useState(false);
  const [isOpenEffects, setIsOpenEffects] = useState(false);
  const [isOpenInstrument, setIsOpenInstrument] = useState(false);
  const [isOpenShowTime, setIsOpenShowTime] = useState(false);
  const [isOpenTextToProcess, setIsOpenTextToProcess] = useState(false);

  const handleOpenShowTime = () => {
    if (isOpenShowTime === false) {
      setIsOpenShowTime(true);
    } else {
      setIsOpenShowTime(false);
    }
  };

  const handleOpenTextToProcess = () => {
    if (isOpenTextToProcess === false) {
      setIsOpenTextToProcess(true);
    } else {
      setIsOpenTextToProcess(false);
    }
  };

  // Function to open the On & Hush
  const handleOnHush = () => {
    if (isOnHush === false) {
      setIsOnHush(true);
    } else {
      setIsOnHush(false);
    }
    setIsOpenEffects(false);
    setIsOpenInstrument(false);
  };

  const handleOpenEffects = () => {
    if (isOpenEffects === false) {
      setIsOpenEffects(true);
    } else {
      setIsOpenEffects(false);
    }
    setIsOnHush(false);
    setIsOpenInstrument(false);
  }

  const handleOpenInstrument= () => {
    if (isOpenInstrument === false) {
      setIsOpenInstrument(true);
    } else {
      setIsOpenInstrument(false);
    }
    setIsOnHush(false);
    setIsOpenEffects(false);
  }

  return (
    <div className="min-h-screen bg-yellow-500">
      <div name="components-bar" className="bg-black p-2 mb-2 flex justify-between">

        {/* The title */}
        <div className='flex'>
          <span className={`text-3xl font-bold text-yellow-500 px-1 ${isPlay ? "animate-spin" : ""}`}>꩜</span>
          <h1 className="text-3xl font-bold text-yellow-500">Strudel Demo </h1>
        </div>
        
        {/* The control buttons */}
        <div name="buttons">
          <ControlButtons
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
              <SongNameController
                setText={setText} 
                modalOpenControl={modalOpenControl} 
                text={text}
                />   
              <SlideInputs onVolumeChange={updateGainInCode} onSpeedChange={updateSpeedInCode} />      
            </div>

            <div>
              <ButtonShowController
                handleOnHush={handleOnHush}
                isOnHush={isOnHush}
                handleOpenEffects={handleOpenEffects}
                isOpenEffects={isOpenEffects}
                handleOpenInstrument={handleOpenInstrument}
                isOpenInstrument={isOpenInstrument}
              />

              <div className={`flex mx-2 bg-black rounded-lg border border-black ${isOnHush ? "" : "hidden"}`}>
                <div className="m-2 p-2">
                  <input className="hidden peer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                  <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor="flexRadioDefault1">
                    Arpeggiator 1
                  </label>
                </div>
                <div className="m-2 p-2">
                  <input className="hidden peer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                  <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor="flexRadioDefault2">
                    Arpeggiator 2
                  </label>
                </div>
              </div>
              
              <Effects 
                isOpenEffects={isOpenEffects} 
                updateEditor={updateEditor} 
                text={text}
              />
              <Instrument 
                isOpenInstrument={isOpenInstrument} 
                updateEditor={updateEditor} 
                text={text}
              />
            </div>
            <div className='mx-2 mt-4'>
                <button className={`text-2xl text-center font-bold flex justify-center rounded-lg w-full border border-black ${isOpenTextToProcess ? ("bg-black text-yellow-500") : ("bg-white text-black")}`}
                onClick={handleOpenTextToProcess}> 
                  Text to process
                </button>

                <textarea 
                  className={`w-full border border-black rounded-lg ${isOpenTextToProcess ? "" : "hidden"}`} 
                  rows="15" 
                  id="proc" 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  ></textarea>
            </div>
          </div>

          <div className='mx-2 mt-4'>
            <button className={`text-2xl text-center font-bold flex justify-center rounded-lg w-full border border-black ${isOpenShowTime ? ("bg-black text-yellow-500") : ("bg-white text-black") }`}
            onClick={handleOpenShowTime}> 
              Show time 
            </button>
    
            <div className={`${isOpenShowTime ? "" : "hidden"}`}>
              <div className="h-500" style={{ maxHeight: '500', overflowY: 'auto' }}>
                <div id="editor"/>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full h-full'>
          <canvas id="roll"></canvas>
        </div>
      </main >
    </div >
);

}