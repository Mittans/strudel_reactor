import "./App.css";
import Transport from "./components/Transport";
import ControlsPanel from "./components/ControlsPanel";
import EditorPane from "./components/EditorPane";
import StrudelProvider from "./context/StrudelProvider";
import StrudelHost from "./components/StrudelHost";

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

                <StrudelHost id="strudel-editor" label="Strudel Editor" />
            </div>
        </StrudelProvider>
    );
}
