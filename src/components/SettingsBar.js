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
            e.target.value = ""; // Yeah, this is needed to prevent issues with having the same name but diff JSON.
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-wrap align-items-center justify-content-between gap-2">
                <div className="d-flex align-items-center gap-2">
                    <h6 className="mb-0">Check it Out:</h6>
                    <span className="text-muted small">If you're the forgetful type, you can also SAVE and LOAD your settings. How good?</span>
                </div>
                <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-secondary" onClick={onSave}>
                        Save DJ Settings
                    </button>
                    <button type="button" className="btn btn-outline-secondary" onClick={onOpenClick}>
                        Load DJ Settings
                    </button>
                    <input
                        ref={fileRef}
                        type="file"
                        accept="application/json"
                        hidden
                        onChange={onLoad}
                    />
                </div>
            </div>
        </div>
    );
}
