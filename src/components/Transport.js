import { useStrudel } from "../context/StrudelProvider";
export default function Transport() {
    const { play, stop, proc, procAndPlay, started } = useStrudel();
    return (
        <nav className="btn-group gap-2">
            <button onClick={proc} className="btn btn-outline-primary" disabled={!started}>Preprocess</button>
            <button onClick={procAndPlay} className="btn btn-outline-primary" disabled={!started}>Proc & Play</button>
            <button onClick={play} className="btn btn-outline-primary" disabled={!started}>Play</button>
            <button onClick={stop} className="btn btn-outline-primary">Stop</button>
        </nav>
    );
}
