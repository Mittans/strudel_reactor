import { useEffect, useRef } from "react";
import { initStrudel, webaudioOutput, getAudioContext, transpiler, evalScope, registerSynthSounds, initAudioOnFirstClick } from "@strudel/web";
import { StrudelMirror } from "@strudel/codemirror";
import { registerSoundfonts } from "@strudel/soundfonts";
import { drawPianoroll } from "@strudel/draw";
import { stranger_tune } from "../assets/tunes";


function Repl({ procText, shouldPlay, shouldStop, onPlayDone }) {
    const editorContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const editorRef = useRef(null);
    const hasRun = useRef(false);

    const handleD3Data = (event) => {
    const data = event.detail;
    console.log("🎶 Received d3Data:", data);
    // You can visualize or store this data as needed
  };

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const drawTime = [-2, 2]; // Time window

        (async () => {
        await initStrudel();

        editorRef.current = new StrudelMirror({
            defaultOutput: webaudioOutput,
            getTime: () => getAudioContext().currentTime,
            transpiler,
            root: editorContainerRef.current,
            drawTime,
            onDraw: (haps, time) => {
            drawPianoroll({ haps, time, ctx, drawTime, fold: 0 });
            },
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
        else editorRef.current.setCode(stranger_tune);
        })();

        // 👂 Listen for D3 data events
        document.addEventListener("d3Data", handleD3Data);

        // 🧹 Cleanup on unmount
        return () => {
        document.removeEventListener("d3Data", handleD3Data);
        editorRef.current?.stop?.();
        };
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
        <div id="editor" ref={editorContainerRef} style={{ minHeight: "300px", maxWidth: "95%", border: "1px solid #444", borderRadius: "8px",}} />
        <canvas
            id="roll"
            ref={canvasRef}
            width={600}
            height={200}
            style={{
            marginTop: "1rem",
            width: "95%",
            background: "linear-gradient(180deg, #1f5f45ff, #48746aff, #1c5a42ff)",
            borderRadius: "8px",
            }}
        />
        </div>
    );
}

export default Repl;
