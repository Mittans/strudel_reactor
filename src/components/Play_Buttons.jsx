function Play_Buttons({ onPlay, onStop }) {
    return (
        <>
            <div className="btn-group" role="group" aria-label="Play Controls">
                <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
                <button id="stop" className="btn btn-outline-danger" onClick={onStop}>Stop</button>
            </div>
        </>
    );
}

export default Play_Buttons;