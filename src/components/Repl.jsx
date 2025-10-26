import { useEffect, useRef } from "react";
import { initStrudel, webaudioOutput, getAudioContext, transpiler, evalScope, registerSynthSounds, initAudioOnFirstClick } from "@strudel/web";
import { StrudelMirror } from "@strudel/codemirror";
import { registerSoundfonts } from "@strudel/soundfonts";

function Repl({ procText, shouldPlay, shouldStop, onPlayDone }) {
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

        if (procText) editorRef.current.setCode(procText);
        })();
    }, []);

    useEffect(() => {
        if (editorRef.current && procText) {
        editorRef.current.setCode(procText);
        }
    }, [procText]);

    // Play
    useEffect(() => {
        if (shouldPlay && editorRef.current) {
        editorRef.current.evaluate();
        onPlayDone?.();
        }
    }, [shouldPlay]);

    // Stop
    useEffect(() => {
        if (shouldStop && editorRef.current) {
        editorRef.current.stop();
        onPlayDone?.();
        }
    }, [shouldStop]);

    return (
        <div className="col-md-8" style={{ width: "100%", marginTop: "1rem" }}>
        <label htmlFor="editor" className="form-label fw-bold">REPL:</label>
        <div id="editor" ref={editorContainerRef} style={{ minHeight: "300px", maxWidth: "99%", border: "1px solid #444", borderRadius: "8px",}} />
        </div>
    );
}

export default Repl;
