import { StrudelMirror } from "@strudel/codemirror";
import { evalScope } from "@strudel/core";
import { initAudioOnFirstClick } from "@strudel/webaudio";
import { transpiler } from "@strudel/transpiler";
import { getAudioContext, webaudioOutput, registerSynthSounds } from "@strudel/webaudio";
import { registerSoundfonts } from "@strudel/soundfonts";
import { stranger_tune } from "../tunes";
import console_monkey_patch from "../console-monkey-patch";
import { useEffect, useRef } from "react";

function Processor({ setGlobalEditor, rngArray, setRngArray }) {
    // Used to check if the strudel has been processed
    const hasRun = useRef(false);

    // Adds new data to array
    const handleD3Data = (event) => {
        let tempArray = [...rngArray, ...event.detail];
        // ensures that a maximum of 30 data points are accessible to the graph
        if (tempArray.length > 30) {
            tempArray.shift();
        }
        setRngArray(tempArray);
        console.log(event.detail);
    };

    useEffect(() => {
        if (!hasRun.current) {
            document.addEventListener("d3Data", handleD3Data);
            console_monkey_patch();
            hasRun.current = true;
            const drawTime = [-2, 2]; // time window of drawn haps
            setGlobalEditor(
                new StrudelMirror({
                    defaultOutput: webaudioOutput,
                    getTime: () => getAudioContext().currentTime,
                    transpiler,
                    root: document.getElementById("editor"),
                    drawTime,
                    prebake: async () => {
                        initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
                        const loadModules = evalScope(
                            import("@strudel/core"),
                            import("@strudel/draw"),
                            import("@strudel/mini"),
                            import("@strudel/tonal"),
                            import("@strudel/webaudio")
                        );
                        await Promise.all([
                            loadModules,
                            registerSynthSounds(),
                            registerSoundfonts(),
                        ]);
                    },
                })
            );

            document.getElementById("proc").value = stranger_tune;
        }
    }, []);

    // Creates a text area to hold processing information
    return (
        <div className="mb-3 ps-3" style={{ maxHeight: "50vh" }}>
            <textarea
                className="form-control"
                rows="12"
                id="proc"
                style={{ border: "2px solid yellow" }}
            ></textarea>
        </div>
    );
}

export default Processor;
