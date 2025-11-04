import { useStrudel } from "../context/StrudelProvider";

export default function ControlsPanel() {
    const { controls, setControls } = useStrudel();

    return (
        <div className="vstack gap-2">
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="p1"
                    id="p1on"
                    checked={!controls.p1Hushed}
                    onChange={() => setControls({ p1Hushed: false })}
                />
                <label className="form-check-label" htmlFor="p1on">p1: ON</label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="p1"
                    id="p1hush"
                    checked={controls.p1Hushed}
                    onChange={() => setControls({ p1Hushed: true })}
                />
                <label className="form-check-label" htmlFor="p1hush">p1: HUSH</label>
            </div>
        </div>
    );
}
