import './App.css';
import { stranger_tune } from './tunes';
import AudioControls from './components/audio-control/AudioControls';
import PageTitle from './components/PageTitle';
import TextPreprocessor from './components/TextPreprocesser';
import EditorArea from './components/EditorArea';
import StrudelPlayer from "./components/StrudelPlayer";
import { useState, useRef } from "react";

export default function StrudelDemo() {

    let strudelRef = useRef();
    const [strudelCode, setStrudelCode] = useState(stranger_tune);

    function handlePreprocess() {
        const processed = strudelCode.replaceAll("<p1_Radio>", "_");
        setStrudelCode(processed);
    }

    function handlePlay() {
        strudelRef.current?.evaluate();
    }
    function handleStop() {
        strudelRef.current?.stop();
    }
    function handleProcPlay() {
        handlePreprocess();
        strudelRef.current?.evaluate();
    }

    function handleProc() {
        const replace = document.getElementById('flexRadioDefault2').checked ? "_" : "";
        const processed = strudelCode.replaceAll("<p1_Radio>", replace);
        setStrudelCode(processed);

        strudelRef.current?.setCode(processed);
        strudelRef.current?.evaluate();
    }

// return (
//     <div>
//         <PageTitle/>
//         <main>
//             <div className="container-fluid">
//                 <div className="row">
//                     <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
//                         <TextPreprocessor defaultText={stranger_tune} onchange={e => setStrudelCode(e.target.value)}/>
//                     </div>
//                     <div className="col-md-4">
//                         <AudioControls
//                         handlePlay={handlePlay}
//                         handleStop={handleStop}
//                         handlePreprocess={handlePreprocess}
//                         handleProcPlay={handleProcPlay}
//                         />
//                     </div>
//                 </div>
//                 <div className="row">
//                     <EditorArea onProc={handleProc}/>
//                 </div>
//             </div>
//             <StrudelPlayer strudelCode={stranger_tune} strudelRef={strudelRef}/>
//         </main >
//     </div >
// );

return (
  <div className="container-fluid main-container py-4 px-4">
    <PageTitle />
    <br/>
    <div className="row g-4 justify-content-center">
      <div className="col-md-5 col-sm-10">
        <div className="square-box d-flex align-items-center justify-content-center">
          <TextPreprocessor defaultText={stranger_tune} onchange={e => setStrudelCode(e.target.value)}/>
        </div>
      </div>
      <div className="col-md-5 col-sm-10">
        <div className="square-box d-flex align-items-center justify-content-center">
          <AudioControls
          handlePlay={handlePlay}
          handleStop={handleStop}
          handlePreprocess={handlePreprocess}
          handleProcPlay={handleProcPlay}
          />
        </div>
      </div>
      <div className="col-md-5 col-sm-10">
        <div className="square-box d-flex align-items-center justify-content-center">
          <StrudelPlayer strudelCode={stranger_tune} strudelRef={strudelRef}/>
        </div>
      </div>
      <div className="col-md-5 col-sm-10">
        <div className="square-box d-flex align-items-center justify-content-center">
          <EditorArea onProc={handleProc}/>
        </div>
      </div>
    </div>
  </div>
);
}
