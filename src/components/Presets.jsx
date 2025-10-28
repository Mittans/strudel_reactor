import { useState } from 'react';
import tunes from '../assets/tunes.json';
import '../css/Presets.css';

function Presets({ onPresetLoad }) {

    const presetsData = tunes.presets.map((preset) => {
        return {
            id: preset.name.toLowerCase().replace(/\s+/g, "_"),
            displayName: preset.name,
            code: preset.code || ""
        };
    });

    const [selectedPreset, setSelectedPreset] = useState("");

    function loadPreset(id) {
        if (!id) return; // ignore empty selection
        const preset = presetsData.find(p => p.id === id);
        if (!preset) return;

        if (window.confirm("Loading a preset will overwrite your current code. Proceed?")) {
            // send the preset code to parent
            onPresetLoad?.(preset.code);
            setSelectedPreset(id); // update select after confirmation
        } 
        // else do nothing, selection stays the same
    }

    return (
        <select value={selectedPreset} onChange={(e) => loadPreset(e.target.value)} className="preset-select mb-3 w-50">
            <option value="" disabled>Select a preset</option>
            {presetsData.map((preset) => (
                <option key={preset.id} value={preset.id}>
                    {preset.displayName}
                </option>
            ))}
        </select>
    );
}

export default Presets;
