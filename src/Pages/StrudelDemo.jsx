import '../Styles/App.css';
import { useEffect, useRef, useState } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from '../Storage/tunes';
import console_monkey_patch from '../console-monkey-patch';
import MusicSearch from '../Components/SearchFunctionality';
import 'bootstrap-icons/font/bootstrap-icons.css';
import D3 from '../Components/D3';

// Components
import PlayControl from '../Components/PlayControl';
import PlayButtons from '../Components/PlayButtons';
import ProcessButtons from '../Components/ProcessButtons';
import Preprocess from '../Components/Preprocess';
// import MusicSearch from '../Components/SearchFunctionality'; 

const handleD3Data = (event) => {
    console.log("d3Data event detail:", event.detail);
};

export default function StrudelDemo() {
    const hasRun = useRef(false);

    const editorRef = useRef(null);
    const editorRootRef = useRef(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [songData, setSongData] = useState(stranger_tune);

    useEffect(() => {
        if (hasRun.current) return;

        document.addEventListener("d3Data", handleD3Data);
        console_monkey_patch();
        hasRun.current = true;

        const drawTime = [-2, 2];

        editorRef.current = new StrudelMirror({
            defaultOutput: webaudioOutput,
            getTime: () => getAudioContext().currentTime,
            transpiler,
            root: editorRootRef.current,
            drawTime,
            prebake: async () => {
                initAudioOnFirstClick();
                const loadModules = evalScope(
                    import('@strudel/core'),
                    import('@strudel/draw'),
                    import('@strudel/mini'),
                    import('@strudel/tonal'),
                    import('@strudel/webaudio'),
                );
                await Promise.all([
                    loadModules,
                    registerSynthSounds(),
                    registerSoundfonts()
                ]);
            },
        });

        return () => {
            document.removeEventListener("d3Data", handleD3Data);
        };
    }, []);

    return (
        <div className="studio-bg min-vh-100">
            <main className="studio-container">
                <div className="container-fluid">


                    <div className="row mb-4">
                        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}  >
                            <Preprocess defaultValue={songData} onChange={(e) => setSongData(e.target.value)} />
                        </div>



                        <div className="col-md-4">
                            <D3 />

                            <nav className="mt-1 d-flex flex-column gap-2">
                                <ProcessButtons
                                    editorRef={editorRef}
                                    songData={songData}
                                    setIsPlaying={setIsPlaying}
                                />
                                <PlayButtons
                                    editorRef={editorRef}
                                    setIsPlaying={setIsPlaying}
                                />
                            </nav>
                        </div>


                    </div>


                    <div className="row">
                        <div
                            className="col-md-8"
                            style={{ maxHeight: '50vh', overflowY: 'auto' }}
                        >
                            <div ref={editorRootRef} />
                            <div id="output" />
                        </div>

                        <div className="col-md-4">
                            <PlayControl
                                songData={songData}
                                editorRef={editorRef}
                                isPlaying={isPlaying}
                            />
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
