import './App.css';
import { stranger_tune } from './tunes';
import AudioControls from './components/audio-control/AudioControls';
import PageHeader from './components/PageHeader';
import TextPreprocessor from './components/TextPreprocesser';
import EditorArea from './components/EditorArea';
import StrudelPlayer from "./components/StrudelPlayer";
import { useState, useRef, useEffect } from "react";
import Swal from 'sweetalert2';
import D3Graph from './components/D3Graph';

export default function StrudelDemo() {

    let strudelRef = useRef();
    let [strudelCode, setStrudelCode] = useState(stranger_tune);

    // CPM Tempo Edit
    const [cpm, setCpm] = useState(120);
    // Volume (Gain) Edit
    const [volume, setVolume] = useState(0.5);
    // Track instrument on and hush state
    const [cardData, setCardData] = useState({});

    function handlePlay() {
        strudelRef.current?.evaluate();
    }
    function handleStop() {
        strudelRef.current?.stop();
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

        // Add On and Hush logic
        Object.values(cardData).forEach(({ instrument, mode }) => {
            if (!instrument) {
                return;
            }
            
            // Use regex to determine instrument
            const pattern = new RegExp(`\\b${instrument}\\b`, "g");

            if (mode === "HUSH") {
                updatedCode = updatedCode.replace(pattern, `_${instrument}`)
            } else {
                updatedCode = updatedCode.replace(new RegExp(`_${instrument}\\b`, "g"), instrument);
            }
        });

        setStrudelCode(updatedCode);
        strudelRef.current.setCode(updatedCode);

        if (strudelRef.current.repl?.state?.started) {
        strudelRef.current.evaluate();
        }
    }
    }, [cpm, volume, cardData]);

    return (
        <div className="container-fluid main-container py-12 px-4">
            <PageHeader 
                strudelCode={strudelCode}
                cpm={cpm}
                volume={volume}
                setStrudelCode={setStrudelCode}
                setCpm={setCpm}
                setVolume={setVolume}
            />
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
                                cpm={cpm}
                                setCpm={setCpm}
                                volume={volume}
                                setVolume={setVolume}
                            />
                        </div>
                    </div>
                </div>
                <div className="col-md-7 col-sm-10">
                    <div className="card mb-3">
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
                    <div className="card">
                        <div className="card-header text-white">
                            D3 Graph
                        </div>
                        <div className="card-body">
                            <D3Graph/>
                        </div>
                    </div>
                </div>
                <div className="col-md-5 col-sm-10">
                    <div className="card">
                        <div className="card-header text-white">
                            Editor Area
                        </div>
                        <div className="card-body d-flex align-items-center justify-content-center">
                            <EditorArea cardData={cardData} setCardData={setCardData}/>
                        </div>
                    </div>
                </div>
            </div>
            <canvas id="roll" hidden></canvas>
        </div>
    );
}
