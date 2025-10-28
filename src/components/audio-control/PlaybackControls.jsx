function PlaybackControls({ handlePlay, handleStop }) {
    return (
        <>
            <div className="col-6">
                <button className="btn btn-primary btn-lg btn-play w-100" onClick={handlePlay}>Play</button>
            </div>
            <div className="col-6">
                <button className="btn btn-primary btn-lg btn-stop w-100" onClick={handleStop}>Stop</button>
            </div>
        </>
    );
}

export default PlaybackControls;
