import './App.css';
import { stranger_tune } from './tunes';
import AudioControls from './components/audio-control/AudioControls';
import PageHeader from './components/PageHeader';
import TextPreprocessor from './components/TextPreprocesser';
import EditorArea from './components/EditorArea';
import StrudelPlayer from "./components/StrudelPlayer";
import { useState, useRef, useEffect } from "react";
import Swal from 'sweetalert2';

export default function StrudelDemo() {

    let strudelRef = useRef();
    let [strudelCode, setStrudelCode] = useState(stranger_tune);

    // CPM Tempo Edit
    const [cpm, setCpm] = useState(120);
    // Volume (Gain) Edit
    const [volume, setVolume] = useState(0.5);

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

    // Json Stroage Implementation
    function JSONDataString() {

        const controlValues = {
            strudelCode: strudelCode,
            cpm: cpm,
            volume: volume
        }

        return JSON.stringify(controlValues);
    }

    async function saveApp() {
        const dataString = JSONDataString();

        const { value: name} = await Swal.fire({
            title: "Save Application Preset",
            input: "text",
            inputLabel: "Enter a name for your preset",
            inputPlaceholder: "e.g. My Cool Song!",
            confirmButtonText: 'Save',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter a preset name!';
                }
            },
            confirmButtonColor: '#02f75c',
            cancelButtonColor: '#f70244'
        })

        if (name) {
            localStorage.setItem(`${name}_JSON`, dataString)

            Swal.fire({
                title: 'Saved!',
                text: `Your preset ${name} has been saved!`,
                icon: 'success',
            })
        }
    }

    async function loadApp() {

        // Filters to only json presets
        const keys = Object.keys(localStorage).filter(key => key.endsWith("_JSON"));

        if (keys.length == 0) {
            Swal.fire("No saved presents", "You haven't saved a preset yet!", "info");
            return;
        }

        // Prompts which preset to load
        const { value: chosenKey } = await Swal.fire({
            title: "Select a preset",
            input: "select",
            inputOptions: keys.reduce((acc, key) => {
                acc[key] = key;
                return acc;
            }, {}),
            showCancelButton: true,
            confirmButtonText: "Select",
            cancelButtonText: "Cancel"
        });

        // Prompts to either load or delete preset
        const { isConfirmed, isDenied } = await Swal.fire({
            title: `Load or Delete "${chosenKey}"?`,
            showDenyButton: true,
            confirmButtonText: "Load",
            denyButtonText: "Delete",
            showCancelButton: true
        });

        if (isConfirmed) {
            const JSONString = localStorage.getItem(chosenKey);
            if (JSONString) {
                const data = JSON.parse(JSONString);
                setStrudelCode(data.strudelCode);
                setCpm(data.cpm);
                setVolume(data.volume);
                Swal.fire("Loaded!", `"${chosenKey}" loaded successfully`, "success");
            } else {
                Swal.fire("Error", "Could not find preset in local storage", "error");
            }
        }

        if (isDenied) {
            const confirmDelete = await Swal.fire({
            title: "Are you sure?",
            text: `Delete "${chosenKey}" permanently?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#f70244"
            });

            if (confirmDelete.isConfirmed) {
                localStorage.removeItem(chosenKey);
                Swal.fire("Deleted!", `"${chosenKey}" has been removed.`, "success");
            }
        }
    }



    // Updates the REPL when changes in the text preprocessor are entered
    // Updates the CPM in the REPL
    useEffect(() => {
    if (strudelRef.current) {
        let updatedCode = strudelCode;

        // Update tempo
        updatedCode = updatedCode.replace(/setcpm\(.*?\)/, `setcpm(${cpm})`);

        // Update gain()
        updatedCode = updatedCode.replace(/\.gain\([^)]*\)/g, `.gain(${volume})`);

        setStrudelCode(updatedCode);
        strudelRef.current.setCode(updatedCode);

        if (strudelRef.current.repl?.state?.started) {
        strudelRef.current.evaluate();
        }
    }
    }, [cpm, volume]);

    return (
        <div className="container-fluid main-container py-4 px-4">
            <PageHeader saveJSON={saveApp} loadJSON={loadApp} />
            <br />
            <div className="row g-4 justify-content-center">
                <div className="col-md-7 col-sm-10">
                    <div className="card h-100">
                        <div className="card-header text-white">
                            Code Preprocessor
                        </div>
                        <div className="card-body d-flex align-items-center justify-content-center">
                            <TextPreprocessor 
                                defaultText={strudelCode} 
                                onchange={e => setStrudelCode(e.target.value)} 
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-sm-10">
                    <div className="card h-100">
                        <div className="card-header text-white">
                            Audio Controls
                        </div>
                        <div className="card-body d-flex align-items-center justify-content-center">
                            <AudioControls
                                handlePlay={handlePlay}
                                handleStop={handleStop}
                                handlePreprocess={handlePreprocess}
                                handleProcPlay={handleProcPlay}
                                cpm={cpm}
                                setCpm={setCpm}
                                volume={volume}
                                setVolume={setVolume}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-sm-10">
                    <div className="card h-100">
                        <div className="card-header text-white">
                            Strudel Player
                        </div>
                        <div className="card-body">
                            <StrudelPlayer 
                                strudelCode={strudelCode} 
                                strudelRef={strudelRef} 
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-sm-10">
                    <div className="card h-100">
                        <div className="card-header text-white">
                            Editor Area
                        </div>
                        <div className="card-body d-flex align-items-center justify-content-center">
                            <EditorArea onProc={handleProc}/>
                        </div>
                    </div>
                </div>
            </div>
            <canvas id="roll"></canvas>
        </div>
    );
}
