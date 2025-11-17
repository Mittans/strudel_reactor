import ControlPanel from './components/ControlPanel'
import Preprocess from './components/Preprocess'
import Presets from './components/Presets'
import Repl from './components/Repl'
import Strudel from './components/Strudel'
import Graph from './components/Graph'
import tunes from "./assets/tunes.json";
import { extractControlsFromCode, applyControlsToCode, CONTROL_DEFINITIONS } from './utils/controlDefinitions'
import console_monkey_patch from './assets/console-monkey-patch'
import './css/App.css'
import { useState, useRef, useEffect } from 'react';

// Initialize console patch
console_monkey_patch();

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

    // Load built-in presets from tunes.json
    const builtInPresets = tunes.presets.map(t => ({
        ...t,
        builtIn: true
    }));

    const [presets, setPresets] = useState(() => {
        const saved = localStorage.getItem("userPresets");
        const userPresets = saved ? JSON.parse(saved) : [];

        return [...builtInPresets, ...userPresets];
    });

    // ===== PRESET HANDLERS =====

    const handlePresetLoad = (newCode) => setCode(newCode);

    const handlePresetSave = (name, newCode) => {
        const newPreset = {
            id: Date.now().toString(),
            name,
            code: newCode,
            builtIn: false
        };

        const updated = [...presets, newPreset];
        setPresets(updated);

        // Save only user presets
        const onlyUser = updated.filter(p => !p.builtIn);
        localStorage.setItem("userPresets", JSON.stringify(onlyUser));
    };

    const handlePresetDelete = (id) => {
        const updated = presets.filter(p => p.id !== id);
        setPresets(updated);

        const onlyUser = updated.filter(p => !p.builtIn);
        localStorage.setItem("userPresets", JSON.stringify(onlyUser));
    };


    const replRef = useRef(null);

    const handleProcTextChange = (text) => setCode(text);

    const handleProc = () => {
        let replaced = code.replace(`<p1>`, radioValue === "hush" ? "_" : "");

        const cpsValue = bpmValue / 60 / 4;
        replaced = replaced.replace(/setcps\s*\([^)]+\)/g, `setcps(${cpsValue})`);

        setProcessedCode(replaced);
    };

    const handleProcAndPlay = () => {
        if (code === "") {
            alert("No code to process and play!");
            return;
        }
        handleProc();
        setShouldPlay(true);
    };

    const handlePlay = () => {
        if (processedCode === '') {
            alert("Process the code before playing!");
            return;
        }
        setShouldPlay(true);
    };

    const handleStop = () => setShouldStop(true);

    const handlePlayDone = () => {
        setShouldPlay(false);
        setShouldStop(false);
    };

    const handleGraphToggle = () => setShowGraph(!showGraph);

    const finalCode = applyControlsToCode(processedCode, controlValues);

    useEffect(() => {
        const { controls, initialValues } = extractControlsFromCode(processedCode);
        setActiveControls(controls);

        setControlValues(prev => {
            const updated = {};
            for (const c of controls) {
                updated[c] = prev[c] ?? initialValues[c] ?? CONTROL_DEFINITIONS[c].default;
            }
            return updated;
        });
    }, [processedCode]);

    useEffect(() => {
        if (replRef.current) {
            replRef.current.setCode(finalCode);
        }
    }, [controlValues, finalCode]);

    return (
        <>
            <ControlPanel
                onProc={handleProc}
                onProcAndPlay={handleProcAndPlay}
                onPlay={handlePlay}
                onStop={handleStop}
                onGraphToggle={handleGraphToggle}
            />

            <Graph showGraph={showGraph} onClose={() => setShowGraph(false)} />

            <main className='main-content' style={{ overflowX: "hidden" }}>
                <div className='row me-0 flex-nowrap'>
                    <div className='col-8 ms-3'>
                        <Preprocess onChange={handleProcTextChange} value={code} />
                        <Repl
                            ref={replRef}
                            procText={finalCode}
                            shouldPlay={shouldPlay}
                            shouldStop={shouldStop}
                            onPlayDone={handlePlayDone}
                        />
                    </div>

                    <div className='vr p-0' style={{ minHeight: '100vh' }}></div>

                    <div className='col-4 me-0'>
                        <Presets
                            presets={presets}
                            onLoad={handlePresetLoad}
                            onSave={handlePresetSave}
                            onDelete={handlePresetDelete}
                            currentCode={code}
                        />

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
    );
}

export default App;
