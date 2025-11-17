import React from 'react';
import { toast } from 'react-toastify';

export default function PreprocessorControl({ procText, setProcText }) {

    // JSON to file
    function handleSaveJSON() {
        if (!procText.trim()) {
            toast.error("Text editor is empty. Please enter some text before saving.");
            return;
        }
        const json = JSON.stringify({ procText });
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "strudle.json";
        a.click();
        URL.revokeObjectURL(url);
    }

    // Load JSON from file
    function handleLoadJSON(e) {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                if (data.procText) setProcText(data.procText);
                else alert("Loaded JSON does not have 'procText' field.");
            } catch {
                alert("Invalid JSON file.");
            }
        };
        reader.readAsText(file);
    }

    return (
        <div>
            <p style={{ fontSize: "18px", fontWeight: "500", color: "#8b0000", textTransform: "uppercase", letterSpacing: "1px", textShadow: "0 0 8px rgba(255,204,0,0.6)", marginBottom: "15px" }}>Text Editor</p>
            <textarea
                className="form-control"
                rows="15"
                id="proc"
                value={procText}
                onChange={e => setProcText(e.target.value)}
            />
            <div style={{ marginTop: "10px" }}>
                <button onClick={handleSaveJSON}>
                    Save as JSON
                </button>
                <input
                    type="file"
                    accept="application/json"
                    style={{ marginLeft: "10px" }}
                    onChange={handleLoadJSON}
                />
            </div>
        </div>
    );
}
