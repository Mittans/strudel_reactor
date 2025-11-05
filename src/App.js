import "./App.css";
import Transport from "./components/Transport";
import ControlsPanel from "./components/ControlsPanel";
import EditorPane from "./components/EditorPane";
import StrudelProvider from "./context/StrudelProvider";

export default function App() {
  return (
    <StrudelProvider editorContainerId="strudel-editor">
      <div className="container-fluid">
        <h2>Strudel Demo</h2>

        <div className="row mb-3">
          <div className="col-md-8"><Transport /></div>
          <div className="col-md-4"><ControlsPanel /></div>
        </div>

        <EditorPane />

        {/* Strudel editor host, might throw this into a component later tbh */}
        <div className="mt-3">
          <label className="form-label">Strudel Editor</label>
          <div
            id="strudel-editor"
            style={{ minHeight: 260, border: "1px solid #ddd", borderRadius: 6 }}
          />
        </div>
      </div>
    </StrudelProvider>
  );
}
