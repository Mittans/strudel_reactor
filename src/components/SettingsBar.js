import { useRef } from "react";
import { useStrudel } from "../context/StrudelProvider";

export default function SettingsBar() {
    const { raw, setRaw, controls, setControls } = useStrudel();
    const fileRef = useRef(null);

    const onSave = () => {
        const data = { raw, controls };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "strudel-settings.json"; a.click();
        URL.revokeObjectURL(url);
    };

    const onOpenClick = () => fileRef.current?.click();

    const onLoad = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        try {
            const text = await file.text();
            const data = JSON.parse(text);
            if (typeof data.raw === "string") setRaw(data.raw);
            if (data.controls && typeof data.controls === "object") setControls(data.controls);
        } finally {
            e.target.value = ""; // Just some extra handling so the same JSON can be added without errors.
        }
    };

    return (
        <div className="d-flex flex-wrap gap-2 my-2">
            <button className="btn btn-outline-secondary" onClick={onSave}>Save</button>
            <button className="btn btn-outline-secondary" onClick={onOpenClick}>Load</button>
            <input ref={fileRef} type="file" accept="application/json" hidden onChange={onLoad} />
        </div>
    );
}
