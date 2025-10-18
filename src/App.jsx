import ControlPanel from './components/ControlPanel'
import Preprocess from './components/Preprocess'
import Repl from './components/Repl'
import Strudel from './components/Strudel'
import './css/App.css'
import { stranger_tune } from './tunes';
import { useState } from 'react';

function App() {
    
    const [code, setCode] = useState(stranger_tune);

    // Handle control panel
    const handleProc = () => {alert("You have clicked Proc!");}
    const handleProcAndPlay = () => {alert("You have clicked Proc and Play!");}
    const handlePlay = () => {alert("You have clicked Play!");}
    const handleStop = () => {alert("You have clicked Stop!");}

    // Handle Strudel REPL

    // Handle preproc controls

    return (
        <>
            <ControlPanel onProc={handleProc} onProcAndPlay={handleProcAndPlay} onPlay={handlePlay} onStop={handleStop}/>
            <main className='main-content'>
                <div className='row me-0'>
                    <div className='col ms-3'>
                        <Preprocess code={code} setCode={setCode} />
                        <Repl procText={code} />
                    </div>
                    <div className='vr p-0' style={{ minHeight: '100vh'}}>
                    </div>
                    <div className='col'>
                        <Strudel />
                    </div>
                </div>
            </main>

        </>
    )
}

export default App