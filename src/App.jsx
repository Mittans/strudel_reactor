import ControlPanel from './components/ControlPanel'
import Preprocess from './components/Preprocess'
import Presets from './components/Presets'
import Repl from './components/Repl'
import Strudel from './components/Strudel'
import Graph from './components/Graph'
import { extractControlsFromCode } from './utils/controlDefinitions.js'
import './css/App.css'
import { useState, useRef, useEffect } from 'react';

function App() {
    
    const [code, setCode] = useState("");
    const [processedCode, setProcessedCode] = useState("");
    const [shouldPlay, setShouldPlay] = useState(false);
    const [shouldStop, setShouldStop] = useState(false);
    const [showGraph, setShowGraph] = useState(false);
    const [radioValue, setRadioValue] = useState("on");

    const [activeControls, setActiveControls] = useState([]);
    const [controlValues, setControlValues] = useState({});

    const replRef = useRef(null);

    // Handle control panel

    const handleProcTextChange = (text) => setCode(text);

    const handleProc = () => {
        const replaced = code.replace("<p1_Radio>", radioValue === "hush" ? "_" : "");
        setProcessedCode(replaced);
        // send to REPL
        // replRef.current?.setCode(replaced);
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

    function applyControlsToCode(base, values) {
        let result = base;

        for (const key in values) {
            const val = values[key];

            // Replace occurrences like: key <number>
            // Using regex: speed 2.5 → speed 3.1
            const re = new RegExp(`${key}\\s+[0-9\\.]+`, "g");
            result = result.replace(re, `${key} ${val}`);
        }

        return result;
    }

    const finalCode = applyControlsToCode(processedCode, controlValues);



    // Handle preproc controls
    useEffect(() => {
        const foundControls = extractControlsFromCode(processedCode);
        setActiveControls(foundControls);

        // Keep values only for active controls
        setControlValues(prev => {
            const updated = {};
            for (const c of foundControls) {
                updated[c] = prev[c] ?? 0;
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
                        <Repl procText={finalCode} shouldPlay={shouldPlay} shouldStop={shouldStop} onPlayDone={handlePlayDone} />
                    </div>
                    <div className='vr p-0' style={{ minHeight: '100vh'}}>
                    </div>
                    <div className='col-4 me-0'>
                        <Presets onPresetLoad={setCode} currentCode={code} />
                        <Strudel
                            onModeChange={setRadioValue}
                            activeControls={activeControls}
                            controlValues={controlValues}
                            onControlChange={(key, val) =>
                                setControlValues(prev => ({ ...prev, [key]: val }))
                            }
                        />

                    </div>
                </div>
            </main>

        </>
    )
}

export default App