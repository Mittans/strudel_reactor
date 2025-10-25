function PlaybackControls({handlePlay, handleStop}) {
    return (
        <>
            <button id="play" className="btn btn-outline-primary" onClick={handlePlay}>Play</button>
            <button id="stop" className="btn btn-outline-primary" onClick={handleStop}>Stop</button>
        </>
    )
}

export default PlaybackControls;