import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick } from '@strudel/webaudio';
import { transpiler } from '@strudel/transpiler';
import { getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';

const Repl = forwardRef(({ procText, shouldPlay, shouldStop, onPlayDone }, ref) => {
    const editorContainerRef = useRef(null);
    const canvasRef = useRef(null);
    const editorRef = useRef(null);
    const hasRun = useRef(false);

    // Expose setCode method to parent via ref
    useImperativeHandle(ref, () => ({
        setCode: (code) => {
            if (editorRef.current && code) {
                editorRef.current.setCode(code);
            }
        },
        evaluate: () => {
            if (editorRef.current) {
                editorRef.current.evaluate();
            }
        },
        stop: () => {
            if (editorRef.current) {
                editorRef.current.stop();
            }
        }
    }));

    const handleD3Data = (event) => {
        const data = event.detail;
        console.log("Received d3Data:", data);
    };

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const drawTime = [-2, 2]; // Time window

        (async () => {
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
        })();

        document.addEventListener("d3Data", handleD3Data);

        return () => {
            document.removeEventListener("d3Data", handleD3Data);
            // editorRef.current?.stop?.();
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
    }, [shouldPlay, onPlayDone]);

    // Stop
    useEffect(() => {
        if (shouldStop && editorRef.current) {
            editorRef.current.stop();
            onPlayDone?.();
        }
    }, [shouldStop, onPlayDone]);

    return (
        <>
            <label htmlFor="roll" className="form-label fw-bold mt-3">Strudel Visualisation:</label>
            <canvas
                id="roll"
                ref={canvasRef}
                height={100}
                style={{
                    width: "100%",
                    background:
                        "linear-gradient(180deg, #1f5f45ff, #48746aff, #1c5a42ff)",
                    borderRadius: "8px",
                }}
            />
            <div style={{ marginTop: "1rem" }} className="accordion mt-3" id="replAccordion">
                <div className="accordion-item border-0 shadow-sm">
                    <h3 className="accordion-header" id="headingRepl">
                        <button
                            className="accordion-button bg-success bg-opacity-75 text-white fw-bold"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseRepl"
                            aria-expanded="true"
                            aria-controls="collapseRepl"
                        >
                            Strudel REPL
                        </button>
                    </h3>

                    <div
                        id="collapseRepl"
                        className="accordion-collapse collapse"
                        aria-labelledby="headingRepl"
                        data-bs-parent="#replAccordion"
                    >
                        <div className="accordion-body">
                            <div
                                id="editor"
                                ref={editorContainerRef}
                                style={{
                                    minHeight: "300px",
                                    maxWidth: "100%",
                                    border: "1px solid #444",
                                    borderRadius: "8px",
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
});

export default Repl;