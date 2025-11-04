import './App.css';
import { useEffect, useRef, useState} from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import console_monkey_patch, { getD3Data } from './console-monkey-patch';
import DJControls from './components/DJControls';
import Buttons from './components/Buttons';
import ProcButtons from './components/ProcButtons';
import PreprocessEditor from './components/PreprocessEditor';

let globalEditor = null;

const handleD3Data = (event) => {
    console.log(event.detail);
};

//export function SetupButtons() {

//    document.getElementById('play').addEventListener('click', () => globalEditor.evaluate());
//    document.getElementById('stop').addEventListener('click', () => globalEditor.stop());
//    document.getElementById('process').addEventListener('click', () => {
//        Proc()
//    }
//    )
//    document.getElementById('process_play').addEventListener('click', () => {
//        if (globalEditor != null) {
//            Proc()
//            globalEditor.evaluate()
//        }
//    }
//    )
//}


//export function ProcAndPlay() {
//    if (globalEditor != null && globalEditor.repl.state.started == true) {
//        console.log(globalEditor)
//        Proc()
//        globalEditor.evaluate();
//    }
//}

//export function Proc() {

//    let proc_text = document.getElementById('proc').value
//    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
//    ProcessText(proc_text);
//    globalEditor.setCode(proc_text_replaced)
//}

//export function ProcessText(match, ...args) {

//    let replace = ""
//    //if (document.getElementById('flexRadioDefault2').checked) {
//    //    replace = "_"
//    //}

//    return replace
//}

export default function StrudelDemo() {

    const hasRun = useRef(false);

    const handlePlay = () => {
        globalEditor.evaluate()
    }

    const handleStop = () => {
        globalEditor.stop()
    }

    const [songText, setSongText] = useState(stranger_tune)

    const [volume, setVolume] = useState(0.8)

    const [cpm, setCpm] = useState(120);

    const [bass, setBass] = useState(true);

    const [melody, setMelody] = useState(true);

    const [guitar, setGuitar] = useState(true);

    const [drums1, setDrums1] = useState(true);

    const [drums2, setDrums2] = useState(true);

    const [reverbFX, setReverbFX] = useState(true);

    const updateStrudelCode = (text) => {
        const processedText = text
            .replaceAll("<volume>", volume)
            .replaceAll("<cpm>", cpm)
            .replaceAll("<bass>", bass ? "" : "_")
            .replaceAll("<melody>", melody ? "" : "_")
            .replaceAll("<guitar>", guitar ? "" : "_")
            .replaceAll("<drums1>", drums1 ? "" : "_")
            .replaceAll("<drums2>", drums2 ? "" : "_")
            .replaceAll("<reverbFX>", reverbFX ? "" : "_");

        globalEditor.setCode(processedText);
        globalEditor.evaluate();
    };

    const handlePreprocess = () => {
        globalEditor.setCode(songText);
    };

    const handleProcPlay = () => {
        updateStrudelCode(songText);
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value;
        setVolume(newVolume);
        updateStrudelCode(songText);
    };


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
                        //{volume}
                    );
                    

                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);

                },
            });

            document.getElementById('proc').value = stranger_tune;
            //SetupButtons()
            //Proc()
            globalEditor.setCode(songText);
        }
        
    }, [songText]);

    return (
        <div>
            <h2>Strudel Demo</h2>
            <main>

                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <PreprocessEditor defaultValue={songText} onChange={(e) => setSongText(e.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <nav>

                                <ProcButtons onPreprocess={handlePreprocess} onProcPlay={handleProcPlay} />

                                <br />

                                <Buttons onPlay={handlePlay} onStop={handleStop} />

                            </nav>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                            <div id="editor" />
                            <div id="output" />
                        </div>
                        <div className="col-md-4">
                            <DJControls
                                volume={volume}
                                onChange={handleVolumeChange}
                                cpm={cpm}
                                onCpmChange={(e) => setCpm(e.target.value)}
                                bass={bass} onBassChange={() => setBass(!bass)}
                                melody={melody} onMelodyChange={() => setMelody(!melody)}
                                guitar={guitar} onGuitarChange={() => setGuitar(!guitar)}
                                drums1={drums1} onDrums1Change={() => setDrums1(!drums1)}
                                drums2={drums2} onDrums2Change={() => setDrums2(!drums2)}
                                reverbFX={reverbFX} onReverbFXChange={() => setReverbFX(!reverbFX)}                            />
                        </div>
                    </div>
                </div>
                <canvas id="roll"></canvas>
            </main >
        </div >
    );


}