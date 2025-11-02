import { useState, useEffect } from 'react';
import tunes from '../assets/tunes.json';
import '../css/Presets.css';
import { loadUserPresets, saveUserPreset } from "../utils/presetStorage";

function Presets({ onPresetLoad, currentCode }) {
    const [presetsData, setPresetsData] = useState([]);
    const [selectedPreset, setSelectedPreset] = useState("");

    // Load presets on mount
    useEffect(() => {
        const builtIn = tunes.presets.map((preset) => ({
            id: preset.name.toLowerCase().replace(/\s+/g, "_"),
            displayName: preset.name,
            code: preset.code
        }));

        const user = loadUserPresets();

        setPresetsData([...builtIn, ...user]);
    }, []);

    function loadPreset(id) {
        const preset = presetsData.find(p => p.id === id);
        if (!preset) return;

        if (window.confirm("Overwrite current code?")) {
            setSelectedPreset(id);
            onPresetLoad?.(preset.code);
        }
    }

    function handleSavePreset() {
        if (!currentCode?.trim()) {
            alert("No code to save!");
            return;
        }

        const name = prompt("Enter preset name:");
        if (!name) return;

        const id = name.toLowerCase().replace(/\s+/g, "_");

        // Does it already exist?
        const existing = presetsData.find(p => p.id === id);

        // Only save if changed
        if (existing && existing.code === currentCode) {
            alert("Preset is unchanged — nothing to save.");
            return;
        }

        if (existing) {
            const confirmUpdate = window.confirm(
                `Preset "${name}" already exists. Update the code?`
            );
            if (!confirmUpdate) return;

            // Update existing preset
            const updated = presetsData.map(p =>
                p.id === id ? { ...p, code: currentCode } : p
            );

            setPresetsData(updated);
            saveUserPreset(updated);

            return;
        }

        const newPreset = {
            id,
            displayName: name,
            code: currentCode
        };

        const updatedList = [...presetsData, newPreset];

        setPresetsData(updatedList);
        saveUserPreset(updatedList);
    }

    return (
        <>
            <label  id='presetLabel' htmlFor="presetSelect" className="form-label fw-bold">Load Presets?</label>
            <select value={selectedPreset} onChange={(e) => loadPreset(e.target.value)} id='presetSelect' className="preset-select mb-3 w-50">
                <option value="">Select a preset</option>
                {presetsData.map((preset) => (
                    <option key={preset.id} value={preset.id}>
                        {preset.displayName}
                    </option>
                ))}
            </select>

            <button onClick={handleSavePreset} style={{ marginLeft: "10px" }} className="btn btn-success btn-md mb-1 ">
                Add Preset
            </button>
        </>
    );
}

export default Presets;
