const STORAGE_KEY = "user_presets";

export function loadUserPresets() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

export function saveUserPreset(preset) {
    const current = loadUserPresets();
    current.push(preset);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

export function deleteUserPreset(id) {
    const current = loadUserPresets();
    const filtered = current.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
