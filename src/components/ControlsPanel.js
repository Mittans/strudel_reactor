// src/components/ControlsPanel.jsx
import { useStrudel } from "../context/StrudelProvider";

export default function ControlsPanel() {
    const { controls, setControls, started } = useStrudel();

    return (
        <div className="vstack gap-3">

            {/* Radio hushing on placeholder tag */}
            <div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="p1" id="p1_on"
                        checked={!controls.p1Hushed}
                        onChange={() => setControls({ p1Hushed: false })} />
                    <label className="form-check-label" htmlFor="p1_on">p1: ON</label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="radio" name="p1" id="p1_hush"
                        checked={controls.p1Hushed}
                        onChange={() => setControls({ p1Hushed: true })} />
                    <label className="form-check-label" htmlFor="p1_hush">p1: HUSH</label>
                </div>
            </div>

            {/* Tempo adjustment*/}
            <div>
                <label className="form-label" htmlFor="tempo">Tempo expr (setcps):</label>
                <input id="tempo" className="form-control" placeholder="e.g. 120/60/4"
                    value={controls.tempo ?? "120/60/4"}
                    onChange={(e) => setControls({ tempo: e.target.value })} />
            </div>

            {/* Room adjustment */}
            <div>
                <label className="form-label" htmlFor="room">Room: {controls.room ?? 0.2}</label>
                <input id="room" type="range" min="0" max="1" step="0.05" className="form-range"
                    value={controls.room ?? 0.2}
                    onChange={(e) => setControls({ room: parseFloat(e.target.value) })} />
            </div>

            {/* Gain adjustment(range) */}
            <div>
                <label className="form-label" htmlFor="gain">Gain: {controls.gain ?? 1.2}</label>
                <input id="gain" type="range" min="0" max="3" step="0.1" className="form-range"
                    value={controls.gain ?? 1.2}
                    onChange={(e) => setControls({ gain: parseFloat(e.target.value) })} />
            </div>

            {/* 5) Drums mute feature (checkbox) */}
            <div className="form-check">
                <input className="form-check-input" type="checkbox" id="drumsMuted"
                    checked={!!controls.drumsMuted}
                    onChange={(e) => setControls({ drumsMuted: e.target.checked })} />
                <label className="form-check-label" htmlFor="drumsMuted">Mute drums</label>
            </div>

            {/* Synth (pick a synth, pianos are cool) */}
            <div>
                <label className="form-label" htmlFor="synth">Synth:</label>
                <select id="synth" className="form-select"
                    value={controls.synth ?? "gm_piano:0"}
                    onChange={(e) => setControls({ synth: e.target.value })}>
                    <option value="gm_piano:0">GM Piano</option>
                    <option value="gm_piano:4">GM E.Piano</option>
                </select>
            </div>

            {/* This is just a small touch for the ux */}
            {!started && <small className="text-muted">Audio is prepping, controls will take effect shortly…</small>}
        </div>
    );
}
