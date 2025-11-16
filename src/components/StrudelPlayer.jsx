import { StrudelMirror } from "@strudel/codemirror";
import { useEffect, useRef } from "react";
import { evalScope } from "@strudel/core";
import { drawPianoroll } from "@strudel/draw";
import { initAudioOnFirstClick } from "@strudel/webaudio";
import { transpiler } from "@strudel/transpiler";
import { getAudioContext, webaudioOutput, registerSynthSounds } from "@strudel/webaudio";
import { registerSoundfonts } from "@strudel/soundfonts";
import console_monkey_patch from "../console-monkey-patch";

function StrudelPlayer({strudelCode, strudelRef}) {

    const handleD3Data = (event) => {
        console.log(event.detail);
    }

    const editorDiv = useRef(null);
    const hasRun = useRef(false);

    useEffect(() => {
        if (!hasRun.current) {

            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
            const canvas = document.getElementById('roll');
            canvas.width = canvas.width * 2;
            canvas.height = canvas.height * 2;
            const drawContext = canvas.getContext('2d');
            const drawTime = [-2, 2]; // time window of drawn haps
            let strudelMirror = new StrudelMirror({
                defaultOutput: webaudioOutput,
                getTime: () => getAudioContext().currentTime,
                transpiler,
                root: document.getElementById('editor'),
                drawTime,
                onDraw: (haps, time) =>  {
                    drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 })

                   // Allow d3 graph to generate gain values
                   if (haps.length > 0) {
                        // Grab the gain from the last note
                        const lastGain = haps[haps.length - 1].value.gain ?? 0;
                        document.dispatchEvent(new CustomEvent("d3Data", { detail: `gain:${lastGain}` }));
                    }
                },
                prebake: async () => {
                    initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                    const loadModules = evalScope(
                        import('@strudel/core'),
                        import('@strudel/draw'),
                        import('@strudel/mini'),
                        import('@strudel/tonal'),
                        import('@strudel/webaudio'),
                    );
                    await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
                },
            });
            strudelMirror.setCode(strudelCode);
            strudelRef.current = strudelMirror;
        }
    }, []);

    useEffect(() => {
        if (strudelRef.current) {
            strudelRef.current.setCode(strudelCode);
        }
    }, [strudelCode])

    return (
        <div className="col-md-12" style={{maxHeight: '45vh', overflowY: 'auto'}}>
            <div id="editor"></div>
        </div>
    );
}

export default StrudelPlayer;

