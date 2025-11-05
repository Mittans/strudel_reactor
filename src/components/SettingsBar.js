import { useStrudel } from "../context/StrudelProvider";

export default function SettingsBar() {
    const { raw, setRaw, controls, setControls } = useStrudel();

    const save = () => {
        const blob = new Blob([JSON.stringify({ raw, controls }, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url; a.download = "strudel-settings.json"; a.click();
        URL.revokeObjectURL(url);
    };

    const load = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const text = await file.text();
        try {
            const data = JSON.parse(text);
            if (typeof data.raw === "string") setRaw(data.raw);
            if (data.controls && typeof data.controls === "object") setControls(data.controls);
        } catch { }
        e.target.value = ""; 
    };

    return (
        <div className="d-flex gap-2 my-2">
            <button className="btn btn-outline-secondary" onClick={save}>Save Settings</button>
            <label className="btn btn-outline-secondary mb-0">
                Load Settings
                <input type="file" accept="application/json" onChange={load} hidden />
            </label>
        </div>
    );
}
