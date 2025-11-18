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
import { PlaybackController } from './components/controllers/PlaybackController';
import { SlideInputs } from './components/controllers/SlideInputsController';
import AddModal from './components/modal/addModal';
import console_monkey_patch, { GetD3Data } from './console-monkey-patch';
import { SongSelectorController } from './components/controllers/SongSelectorController';
import { PanelToggleController } from './components/controllers/PanelToggleController';
import { OpenShowTimeButton } from './components/buttons/open buttons/OpenShowTimeButton';
import { OpenTextToProcessButton } from './components/buttons/open buttons/OpenTextToProcessButton';
import { OpenD3GraphButton } from './components/buttons/open buttons/OpenD3GraphButton';
import { Graph } from './components/graph/Graph';

let globalEditor = null;

// The global variable of the arpeggiator.
let currentArp = "arpeggiator1";

const handleD3Data = (event) => {
    console.log(event.detail);
};

// Function check if the arpeggiator is duplicated.
export function validateArpeggiators(tuneText) {
    const regex = /const\s+(arpeggiator\d+)\s*=/g;
    const found = [];
    let match;

    while ((match = regex.exec(tuneText)) !== null) {
        if (found.includes(match[1])) {
            return false; 
        }
        found.push(match[1]);
    }
    return true; 
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
  if (!validateArpeggiators(proc_text)){
     return;
  } 
  let proc_text_replaced = proc_text.replaceAll('<Radio>', currentArp);
  globalEditor.setCode(proc_text_replaced)
}

export default function StrudelDemo() {

  const hasRun = useRef(false);

  // Variable to check if the song is play
  const [isPlay,setIsPlay] = useState(false);

  // Variable to handle the change of the volume.
  const [volume, setVolumeState] = useState(1); 

  // Variable to handle the change of the speed.
  const [speed, setSpeed] = useState(0.5); 

  // Variable to save text, set up stranger_tune initially.
  const [text, setText] = useState(stranger_tune);

  // Variable to handle the open button.
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenSetting,setIsOpenSetting] = useState(false);
  const [isOpenShowTime, setIsOpenShowTime] = useState(false);
  const [isOpenTextToProcess, setIsOpenTextToProcess] = useState(false);
  const [isOpenD3Graph, setIsOpenD3Graph] = useState(false);

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
          ProcAndPlay();
      });
    
    // Function to handle update the editor from the other files.
    function updateEditor(newText) {
    setText(newText);
 
    if (globalEditor) {
      globalEditor.setCode(newText); 
    }
  }

  // Function to handle changing the arppeggiator
  function handleChangeArp(e) {
    currentArp = e.target.value;
    ProcAndPlay();
  }

  // Controller allow the system to play the song
  const handlePlay = () => {
    const editorValue = document.getElementById("proc").value;
    if (globalEditor != null && editorValue != "") {
      setIsPlay(true);
      globalEditor.evaluate();
    } else{
      alert("You should write the code in the box to play the music")
    }
  }


  // Controller allow the system to stop the song 
  const handleStop = () => {
    setIsPlay(false);
    globalEditor.stop()
  }

  // Controller allow the system to process the global taking code from the "proc" and play the song. 
  // It will alerts if the text is empty.
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

  // Controller allow the system to open the modal.
  const modalOpenControl = () => {
    setIsOpenModal(true);
  }

  // Controller allow the system to close the modal.
  const modalCloseControl = () => {
    setIsOpenModal(false);
  }

  // Controller allow the system to open the editor
  const handleOpenShowTime = () => {
    if (isOpenShowTime === false) {
      setIsOpenShowTime(true);
    } else {
      setIsOpenShowTime(false);
    }
  };

  // Controller allow the system to open the text box to process
  const handleOpenTextToProcess = () => {
    if (isOpenTextToProcess === false) {
      setIsOpenTextToProcess(true);
    } else {
      setIsOpenTextToProcess(false);
    }
  };

  // Controller allow the system to open the setting
  const handleOpenSetting= () => {
    if (isOpenSetting === false) {
      setIsOpenSetting(true);
    } else {
      setIsOpenSetting(false);
    }
  };

  // Controller allow the system to open the D3 Graph
  const handleOpenD3Graph = () => {
    if (isOpenD3Graph === false) {
      setIsOpenD3Graph(true);
    } else {
      setIsOpenD3Graph(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-500">
      <div name="components-bar" className="bg-zinc-900 p-2 mb-2 flex justify-between">

        {/* The title */}
        <div className='flex'>
          <span className={`text-4xl font-bold text-yellow-500 px-1 ${isPlay ? "animate-spin" : ""}`}>꩜</span>
          <h1 className="text-4xl font-bold text-yellow-500">Strudel </h1>
        </div>
        
        {/* The control buttons */}
        <div name="buttons">
          <PlaybackController
          handleProcPlay={handleProcPlay}
          handleStop={handleStop}
          handlePlay={handlePlay}
          isPlay={isPlay}/>
        </div>

        {/* The Saving Modal appears after clicking save button */}
        {isOpenModal && (
        <AddModal modalCloseControl={modalCloseControl} text={text}/>
        )}
      </div>

      <main>
        <div className="container-fluid">
          <div>
            <div className='flex justify-between mb-2'>  
              {/* Song selector */}
              <SongSelectorController
                setText={setText} 
                text={text}
                handleOpenSetting={handleOpenSetting}
                isOpenSetting={isOpenSetting}
                modalOpenControl={modalOpenControl} 
                />   

              {/* Slider inputs includes volume and speed */}
              <SlideInputs text={text} updateEditor={updateEditor} volume={volume} setVolumeState={setVolumeState} speed={speed} setSpeed={setSpeed}/>      
            </div>

            <div>

              {/* Panel toggle includes arpeggiator selection, effect selection, and instrument selection */}
              <PanelToggleController
                text={text}
                updateEditor={updateEditor}
                ProcAndPlay={ProcAndPlay}
                handleChangeArp={handleChangeArp}
              />
            </div>

            <div className='mx-10 mt-4'>
                {/* Button to show the textarea that was hidden */}
                <OpenTextToProcessButton handleOpenTextToProcess={handleOpenTextToProcess} isOpenTextToProcess={isOpenTextToProcess}/>

                <textarea 
                  className={`w-full border border-black rounded-lg ${isOpenTextToProcess ? "" : "hidden"}`} 
                  rows="15" 
                  id="proc" 
                  value={text}
                  onChange={(e) => {
                    if (validateArpeggiators(e.target.value)) {
                      setText(e.target.value);
                    } else {
                        alert("Duplicate arpeggiator name detected! Update cancelled.");
                    }}}
                  ></textarea>
            </div>
          </div>

          <div className='mx-10 mt-4'>

             {/* Button to show the editor that was hidden */}
            <OpenShowTimeButton isOpenShowTime={isOpenShowTime} handleOpenShowTime={handleOpenShowTime}/>
    
            <div className={`${isOpenShowTime ? "" : "hidden"}`}>
              <div className="h-500" style={{ maxHeight: '500', overflowY: 'auto' }}>
                <div id="editor"/>
              </div>
            </div>
          </div>
        </div>
        <div className='mx-10 mt-4'>

           {/* Button to show the graphthat was hidden */}
          <OpenD3GraphButton isOpenD3Graph={isOpenD3Graph} handleOpenD3Graph={handleOpenD3Graph}/>

          <canvas className={`bg-zinc-800 w-full hidden`} id="roll"></canvas>
          <Graph className={`bg-zinc-800 w-full ${isOpenD3Graph ? "" : "hidden"}`} volume={volume} speed={speed} setSpeed={setSpeed} isPlay={isPlay}/>
        </div>
      </main >
    </div >
);

}