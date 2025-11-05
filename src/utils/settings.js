const KEY = "strudel-demo/settings/v1";

export function makeSnapshot({ controls, raw }) {
    return {
        version: 1,
        savedAt: new Date().toISOString(),
        controls,
        raw,
    };
}

export function saveToLocal(snapshot) {
    localStorage.setItem(KEY, JSON.stringify(snapshot));
}

export function loadFromLocal() {
    const s = localStorage.getItem(KEY);
    if (!s) return null;
    try { return JSON.parse(s); } catch { return null; }
}

export function downloadSnapshot(snapshot, filename = "strudel-settings.json") {
    const blob = new Blob([JSON.stringify(snapshot, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}
