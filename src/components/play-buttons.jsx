function PlayButtons({ onPlay, onPause }) {
    return (
        <>
            <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
            <button id="stop" className="btn btn-outline-primary" onClick={onPause}>Stop</button>
        </>
    );
}

export default PlayButtons;