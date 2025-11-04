import { createContext, useContext, useMemo, useState } from "react";
import { preprocessSong } from "../utils/preprocess";
import { stranger_tune } from "../assets/tunes";

const Ctx = createContext(null);
export const useStrudel = () => {
    const v = useContext(Ctx);
    if (!v) throw new Error("useStrudel must be inside StrudelProvider");
    return v;
};

export default function StrudelProvider({ children }) {
    const [raw, setRaw] = useState(stranger_tune);  
    const [controls, setControls] = useState({ p1Hushed: false });
    const processed = preprocessSong(raw, controls);

    const api = useMemo(() => ({
        raw, setRaw,
        processed,
        controls,
        setControls: (patch) => setControls(c => ({ ...c, ...patch })),
        // stubs (going to put actual stuff here later)
        play: () => { },
        stop: () => { },
        proc: () => { },
        procAndPlay: () => { }
    }), [raw, processed, controls]);

    return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}
