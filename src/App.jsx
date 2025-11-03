import ControlPanel from './components/ControlPanel'
import Preprocess from './components/Preprocess'
import Presets from './components/Presets'
import Repl from './components/Repl'
import Strudel from './components/Strudel'
import Graph from './components/Graph'
import { extractControlsFromCode, applyControlsToCode, CONTROL_DEFINITIONS } from './utils/controlDefinitions.js'
import console_monkey_patch from './assets/console-monkey-patch' // ADD THIS
import './css/App.css'
import { useState, useRef, useEffect } from 'react';

// Initialize the monkey patch once
console_monkey_patch(); // ADD THIS

function App() {
    
    const [code, setCode] = useState("");
    const [processedCode, setProcessedCode] = useState("");
    const [shouldPlay, setShouldPlay] = useState(false);
    const [shouldStop, setShouldStop] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [radioValue, setRadioValue] = useState("on");
    const [bpmValue, setBpmValue] = useState(140);

    const [activeControls, setActiveControls] = useState([]);
    const [controlValues, setControlValues] = useState({});

    const replRef = useRef(null);

    // Handle control panel

    const handleProcTextChange = (text) => setCode(text);

    const handleProc = () => {
        let replaced = code.replace(`<p1>`, radioValue === "hush" ? "_" : "");
        
        const cpsValue = bpmValue / 60 / 4; // Convert BPM to CPS
        replaced = replaced.replace(/setcps\s*\([^)]+\)/g, `setcps(${cpsValue})`);
        
        setProcessedCode(replaced);
    };

    const handleProcAndPlay = () => {

        if(code === ""){
            alert("No code to process and play!");
            return;
        }
        else{
            handleProc();
            setShouldPlay(true);
        }
    };

    const handlePlay = () => {
        if(processedCode === '') {
            alert("Process the code before playing!"); 
            return;
        } 
        else {
            setShouldPlay(true)
        }
    };
    const handleStop = () => setShouldStop(true);

    const handlePlayDone = () => {
        setShouldPlay(false);
        setShouldStop(false);
    };

    const handleGraphToggle = () => setShowGraph(!showGraph);

    const finalCode = applyControlsToCode(processedCode, controlValues);

    // Handle preproc controls
    useEffect(() => {
        const { controls, initialValues } = extractControlsFromCode(processedCode);
        setActiveControls(controls);

        // Initialize with actual values from code, not zeros!
        setControlValues(prev => {
            const updated = {};
            for (const c of controls) {
                // Use initial value from code, or keep existing value, or use default
                updated[c] = prev[c] ?? initialValues[c] ?? CONTROL_DEFINITIONS[c].default;
            }
            return updated;
        });
    }, [processedCode]);

    useEffect(() => {
        // If the code is currently shown in REPL
        // update it live when slider changes
        if (replRef.current) {
            replRef.current.setCode(finalCode);
        }
    }, [controlValues, finalCode]);


    return (
        <>
            <ControlPanel onProc={handleProc} onProcAndPlay={handleProcAndPlay} onPlay={handlePlay} onStop={handleStop} onGraphToggle={handleGraphToggle}/>
            <Graph showGraph={showGraph} onClose={() => setShowGraph(false)}/>
            <main className='main-content' style={{ overflowX: "hidden" }}>
                <div className='row me-0 flex-nowrap'>
                    <div className='col-8 ms-3'>
                        <Preprocess onChange={handleProcTextChange} value={code} />
                        <Repl ref={replRef} procText={finalCode} shouldPlay={shouldPlay} shouldStop={shouldStop} onPlayDone={handlePlayDone} />
                    </div>
                    <div className='vr p-0' style={{ minHeight: '100vh'}}>
                    </div>
                    <div className='col-4 me-0'>
                        <Presets onPresetLoad={setCode} currentCode={code} />
                        <Strudel
                            activeControls={activeControls}
                            controlValues={controlValues}
                            onControlChange={(key, val) =>
                                setControlValues(prev => ({ ...prev, [key]: val }))
                            }
                            bpmValue={bpmValue}
                            onBpmChange={setBpmValue}
                        />
                    </div>
                </div>
            </main>
        </>
    )
}

export default App