import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { preprocessSong } from "../utils/preprocess";
import { stranger_tune } from "../assets/tunes";
import { StrudelMirror } from "@strudel/codemirror";
import { evalScope } from "@strudel/core";
import { transpiler } from "@strudel/transpiler";
import {
    getAudioContext,
    webaudioOutput,
    registerSynthSounds,
    initAudioOnFirstClick,
} from "@strudel/webaudio";
import { registerSoundfonts } from "@strudel/soundfonts";

const Ctx = createContext(null);
export const useStrudel = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error("useStrudel must be inside StrudelProvider");
    return v;
};

export default function StrudelProvider({ children, editorContainerId = "strudel-editor" }) {
    const [raw, setRaw] = useState(stranger_tune);
    const [controls, setControls] = useState({ p1Hushed: false });
    const processed = preprocessSong(raw, controls);

    const mirrorRef = useRef(null);
    const hostRef = useRef(null);

    useEffect(() => {
        const host = document.getElementById(editorContainerId);
        if (!host) {
            console.error(`[StrudelProvider] Host #${editorContainerId} not found`);
            return;
        }
        hostRef.current = host;

        try { host.replaceChildren(); } catch { }

        const mirror = new StrudelMirror({
            defaultOutput: webaudioOutput,
            getTime: () => getAudioContext().currentTime,
            transpiler,
            root: host,
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

        mirrorRef.current = mirror;

        return () => {
            try { mirror.stop(); } catch { }
            mirrorRef.current = null;
            try { host.replaceChildren(); } catch { }
            hostRef.current = null;
        };
    }, [editorContainerId]);

    // Keep mirror code in sync with processed text
    useEffect(() => {
        const m = mirrorRef.current;
        if (m) m.setCode(processed);
    }, [processed]);

    const api = useMemo(() => {
        const play = () => mirrorRef.current?.evaluate();
        const stop = () => mirrorRef.current?.stop();
        const proc = () => mirrorRef.current?.setCode(processed);
        const procAndPlay = () => {
            const m = mirrorRef.current;
            if (!m) return;
            m.setCode(processed);
            m.evaluate();
        };

        return {
            raw, setRaw,
            processed,
            controls,
            setControls: (patch) => setControls((c) => ({ ...c, ...patch })),
            play, stop, proc, procAndPlay,
        };
    }, [raw, processed, controls]);

    return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
