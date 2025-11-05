import { ProcAndPlay } from '../preprocess';

function Toggle({ id, label, defaultChecked = true }) {
    return (
        <div className="form-check form-switch">
            <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id={id}
                defaultChecked={defaultChecked}
                onChange={ProcAndPlay}
            />
            <label className="form-check-label" htmlFor={id}>{label}</label>
        </div>
    );
}

export default function PreprocControls() {
    return (
        <div className="card">
            <div className="card-header fw-semibold">Tracks &amp; Tempo</div>
            <div className="card-body d-flex flex-column gap-3">
                <div className="d-flex flex-wrap gap-4">
                    <Toggle id="toggle-bass"  label="Bass"  />
                    <Toggle id="toggle-arp"   label="Arp"   />
                    <Toggle id="toggle-dr1"   label="Drums 1" />
                    {/*<Toggle id="toggle-dr2"   label="Drums 2" />*/}
                </div>

                <div>
                    <label htmlFor="tempo" className="form-label mb-1">Tempo</label>
                    <input
                        id="tempo"
                        type="range"
                        min={60}
                        max={200}
                        step={1}
                        defaultValue={140}
                        className="form-range"
                        onChange={ProcAndPlay}
                    />
                    <div className="small text-secondary">Drag to slow down / speed up</div>
                </div>
            </div>
        </div>
    );
}
