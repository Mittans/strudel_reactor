import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

function PlayButtons({ onPlay, onPause }) {
    return (
        <>
            <div className="btn-group btn-group-lg pt-3">
                <button id="play" className="btn btn-secondary" title="Play" onClick={onPlay}><BsFillPlayFill /></button>
                <button id="stop" className="btn btn-secondary" title="Pause" onClick={onPause}><BsFillPauseFill /></button>
            </div>
        </>
    );
}

export default PlayButtons;