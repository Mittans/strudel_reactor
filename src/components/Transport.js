import { useStrudel } from "../context/StrudelProvider";
export default function Transport() {
    const { play, stop, proc, procAndPlay } = useStrudel();
    return (
        <nav className="btn-group gap-2">
            <button onClick={proc} className="btn btn-outline-primary">Preprocess</button>
            <button onClick={procAndPlay} className="btn btn-outline-primary">Proc & Play</button>
            <button onClick={play} className="btn btn-outline-primary">Play</button>
            <button onClick={stop} className="btn btn-outline-primary">Stop</button>
        </nav>
    );
}
