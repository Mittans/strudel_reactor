import { useEffect, useRef } from "react";
import { initStrudel, webaudioOutput, getAudioContext, transpiler, evalScope, registerSynthSounds, initAudioOnFirstClick } from "@strudel/web";
import { StrudelMirror } from "@strudel/codemirror";
import { registerSoundfonts } from "@strudel/soundfonts";

function Repl({ procText }) {
    const editorContainerRef = useRef(null);
    const editorRef = useRef(null);
    const hasRun = useRef(false);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        (async () => {
            
        await initStrudel();

        editorRef.current = new StrudelMirror({
            defaultOutput: webaudioOutput,
            getTime: () => getAudioContext().currentTime,
            transpiler,
            root: editorContainerRef.current,
            prebake: async () => {
            initAudioOnFirstClick();
            const loadModules = evalScope(
                import("@strudel/core"),
                import("@strudel/draw"),
                import("@strudel/mini"),
                import("@strudel/tonal"),
                import("@strudel/webaudio")
            );
            await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
            },
        });

        // Optional: automatically set the text passed from preprocessor
        if (procText) {
            editorRef.current.setCode(procText);
        }
        })();
    }, [procText]);

    return (
        <div className="col-md-8" style={{ maxHeight: "50vh", overflowY: "auto", width: "100vh" }}>
            <label htmlFor="editor" className="form-label">REPL:</label>
            <div id="editor" ref={editorContainerRef} />
        </div>
    );
}

export default Repl;
