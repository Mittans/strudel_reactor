import { useRef } from "react";

export default function TextJsonControls({ procText, onLoadText }) {
  //hidden file input (for loading JSON)
  const fileInputRef = useRef(null);

  //save only the strudel code text as JSON
  const handleSaveText = () => {
    const preset = { procText };
    const json = JSON.stringify(preset, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "strudel-text.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  //open the file picker
  const handleLoadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  //handle selected JSON file
  const handlePresetFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        if (typeof data.procText === "string") {
         
          if (typeof onLoadText === "function") {
            onLoadText(data.procText);
          }
        } else {
          alert("JSON file is missing 'procText'");
        }
      } catch (err) {
        console.error("Invalid JSON file:", err);
        alert("Invalid JSON file");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        className="btn btn-primary btn-sm me-2"
        onClick={handleSaveText}
      >
        Save Text (JSON)
      </button>

      <button
        type="button"
        className="btn btn-secondary btn-sm"
        onClick={handleLoadClick}
      >
        Load Text
      </button>

      {/* hidden input used for selecting the JSON file */}
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json"
        style={{ display: "none" }}
        onChange={handlePresetFileChange}
      />
    </div>
  );
}
