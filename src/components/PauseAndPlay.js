function PauseAndPlay() {
    return (
        <>
            <nav className="btn-group" role="group" aria-label="Transport controls">
                <button id="play" className="btn btn-outline-primary">Play</button>
                <button id="stop" className="btn btn-outline-primary">Stop</button>
            </nav>
        </>
    );
}
export default PauseAndPlay;