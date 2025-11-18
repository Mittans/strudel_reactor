const STORAGE_KEY = "user_presets";

// Load user-defined presets from localStorage
export function loadUserPresets() {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
}

// Save a user-defined preset to localStorage
export function saveUserPreset(preset) {
    const current = loadUserPresets();
    current.push(preset);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
}

// Delete a user-defined preset from localStorage
export function deleteUserPreset(id) {
    const current = loadUserPresets();
    const filtered = current.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
