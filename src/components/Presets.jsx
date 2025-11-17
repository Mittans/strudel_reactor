import { useState, useEffect } from 'react';
// import tunes from '../assets/tunes.json';
import '../css/Presets.css';
// import { loadUserPresets, saveUserPreset } from "../utils/presetStorage";

function Presets({ presets, onLoad, onSave, onDelete, currentCode }) {
  const [selected, setSelected] = useState("");

  const handleLoad = (id) => {
    if (!id) return;
    
    const preset = presets.find(p => p.id === id);
    if (!preset) return;

    if (window.confirm("Load this preset? Current code will be replaced.")) {
      setSelected(id);
      onLoad(preset.code);
    }
  };

  const handleSave = () => {
    if (!currentCode?.trim()) {
      alert("No code to save!");
      return;
    }

    const name = prompt("Enter preset name:");
    if (!name?.trim()) return;

    onSave(name, currentCode);
    alert(`Preset "${name}" saved!`);
  };

  const handleDelete = () => {
    if (!selected) {
      alert("No preset selected");
      return;
    }

    const preset = presets.find(p => p.id === selected);
    if (preset?.builtIn) {
      alert("Cannot delete built-in presets!");
      return;
    }

    if (window.confirm(`Delete preset "${preset.name}"?`)) {
      onDelete(selected);
      setSelected("");
      alert("Preset deleted!");
    }
  };

  return (
    <div style={{ marginBottom: '1rem', maxWidth: '400px' }}>
      <label htmlFor="presetSelect" className="form-label fw-bold">Load Presets?</label>
      <select
        id="presetSelect"
        className="form-select mb-2"
        value={selected}
        onChange={(e) => {
          setSelected(e.target.value);
          handleLoad(e.target.value);
        }}
      >
        <option value="">Select a preset</option>
        {presets.map(preset => (
          <option key={preset.id} value={preset.id}>
            {preset.name}{preset.builtIn ? ' (Built-in)' : ''}
          </option>
        ))}
      </select>
      
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={handleSave} className="btn btn-success btn-sm">
          Save Preset
        </button>
        <button
          onClick={handleDelete}
          className="btn btn-danger btn-sm"
          disabled={!selected || presets.find(p => p.id === selected)?.builtIn}
        >
          Delete Preset
        </button>
      </div>
    </div>
  );
}

export default Presets;
