import ControlPanel from './components/ControlPanel'
import Preprocess from './components/Preprocess'
import Presets from './components/Presets'
import Repl from './components/Repl'
import Strudel from './components/Strudel'
import Graph from './components/Graph'
import './css/App.css'
import { useState, useRef } from 'react';

function App() {
    
    const [code, setCode] = useState("");
    const [processedCode, setProcessedCode] = useState("");
    const [shouldPlay, setShouldPlay] = useState(false);
    const [shouldStop, setShouldStop] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [radioValue, setRadioValue] = useState("on");

    const replRef = useRef(null);

    // Handle control panel

    const handleProcTextChange = (text) => setCode(text);

    const handleProc = () => {
        const replaced = code.replace("<p1_Radio>", radioValue === "hush" ? "_" : "");
        setProcessedCode(replaced);
        // send to REPL
        replRef.current?.setCode(replaced);
    };

    const handleProcAndPlay = () => {
        handleProc();
        setShouldPlay(true);
    };

    const handlePlay = () => setShouldPlay(true);
    const handleStop = () => setShouldStop(true);

    const handlePlayDone = () => {
        setShouldPlay(false);
        setShouldStop(false);
    };

    const handleGraphToggle = () => setShowGraph(!showGraph);

    // Handle Strudel REPL

    // Handle preproc controls

    return (
        <>
            <ControlPanel onProc={handleProc} onProcAndPlay={handleProcAndPlay} onPlay={handlePlay} onStop={handleStop} onGraphToggle={handleGraphToggle}/>
            <Graph showGraph={showGraph} onClose={() => setShowGraph(false)}/>
            <main className='main-content' style={{ overflowX: "hidden" }}>
                <div className='row me-0 flex-nowrap'>
                    <div className='col-8 ms-3'>
                        <Preprocess onChange={handleProcTextChange} value={code} />
                        <Repl procText={processedCode} shouldPlay={shouldPlay} shouldStop={shouldStop} onPlayDone={handlePlayDone} />
                    </div>
                    <div className='vr p-0' style={{ minHeight: '100vh'}}>
                    </div>
                    <div className='col-4 me-0'>
                        <Presets onPresetLoad={setCode} />
                        <Strudel onModeChange={setRadioValue}/>
                    </div>
                </div>
            </main>

        </>
    )
}

export default App