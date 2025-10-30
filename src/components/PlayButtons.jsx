function PlayButtons({ onPlay, onStop }) {
    return (
        <div className="d-flex gap-2"> 
            <button id="play" className="btn btn-primary bi bi-play-circle-fill" onClick={onPlay}></button>
            <button id="stop" className="btn btn-primary bi bi-pause-circle-fill" onClick={onStop}></button>
        </div>
    );
}
export default PlayButtons