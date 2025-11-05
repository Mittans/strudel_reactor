export default function Controls() {
    return (
        <div className="card">
            <div className="card-header fw-semibold">Controls</div>
            <div className="card-body d-flex flex-wrap gap-2">
                <button id="process" className="btn btn-outline-primary">Preprocess</button>
                <button id="process_play" className="btn btn-primary">Proc &amp; Play</button>
                <button id="play" className="btn btn-success">Play</button>
                <button id="stop" className="btn btn-outline-secondary">Stop</button>
            </div>
        </div>
    );
}
