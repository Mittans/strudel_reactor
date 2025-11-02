export default function Controls({ onProcess, onProcPlay, onPlay, onStop , replay}) {
    return (
        <div className="music-controls d-flex justify-content-center align-items-center gap-3 my-3">
            <button className="control-btn" onClick={onProcess}>Process</button>
            <button className="control-btn" onClick={onProcPlay}>Proc&Play</button>
            <button className="control-btn" onClick={onStop}>⏹️</button>
            <button className="control-btn play-btn" onClick={onPlay}>▶</button>
            <button className="control-btn" onClick={replay}>🔄</button>
        </div>
    );
}
