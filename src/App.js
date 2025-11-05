import "./App.css";
import Transport from "./components/Transport";
import ControlsPanel from "./components/ControlsPanel";
import EditorPane from "./components/EditorPane";
import StrudelProvider from "./context/StrudelProvider";
import StrudelHost from "./components/StrudelHost";
import SettingsBar from "./components/SettingsBar";

export default function App() {
    return (
        <StrudelProvider editorContainerId="strudel-editor">
            <div className="container py-3">
                <div className="d-flex align-items-end justify-content-between mb-3">
                    <h2 className="mb-0">Strudel Beat Studio: React Edition</h2>
                </div>

                <SettingsBar />

                <div className="row g-3">
                    <div className="col-lg-7">
                        <div className="card h-100">
                            <div className="card-header"><strong>Your Epic Beat Goes In This Box:</strong></div>
                            <div className="card-body">
                                <EditorPane />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="card h-100">
                            <div className="card-header"><strong>Modify &/Or Play it w/ DJ Controls:</strong></div>
                            <div className="card-body">
                                <div className="mb-3">
                                    <Transport />
                                </div>
                                <ControlsPanel />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header"><strong>Live Stage:</strong></div>
                    <div className="card-body">
                        <StrudelHost id="strudel-editor" label="" className="mb-0" />
                    </div>
                </div>
            </div>
        </StrudelProvider>
    );
}
