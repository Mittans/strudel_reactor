import { ProcAndPlay } from '../../lib/preprocess';

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
            <div className="card-header fw-semibold">Tracks</div>
            <div className="card-body d-flex flex-column gap-2">
                <Toggle id="toggle-bass" label="Bass" />
                <Toggle id="toggle-arp" label="Arp" />
                <Toggle id="toggle-dr1" label="Drums 1" />
                <Toggle id="toggle-dr2" label="Drums 2" />
            </div>
        </div>
    );
}
