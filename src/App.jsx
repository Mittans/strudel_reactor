import ControlPanel from './components/ControlPanel'
import Preprocess from './components/Preprocess'
import Repl from './components/Repl'
import Strudel from './components/Strudel'
import './css/App.css'
import { useState, useRef } from 'react';

function App() {
    
    const [code, setCode] = useState("");
    const [processedCode, setProcessedCode] = useState("");
    const [shouldPlay, setShouldPlay] = useState(false);
    const [shouldStop, setShouldStop] = useState(false);
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

    // Handle Strudel REPL

    // Handle preproc controls

    return (
        <>
            <ControlPanel onProc={handleProc} onProcAndPlay={handleProcAndPlay} onPlay={handlePlay} onStop={handleStop}/>
            <main className='main-content'>
                <div className='row me-0'>
                    <div className='col ms-3'>
                        <Preprocess onChange={handleProcTextChange} />
                        <Repl procText={processedCode} shouldPlay={shouldPlay} shouldStop={shouldStop} onPlayDone={handlePlayDone} />
                    </div>
                    <div className='vr p-0' style={{ minHeight: '100vh'}}>
                    </div>
                    <div className='col'>
                        <Strudel onModeChange={setRadioValue}/>
                    </div>
                </div>
            </main>

        </>
    )
}

export default App