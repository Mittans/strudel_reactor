import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";

function PlayButtons({ onPlay, onPause }) {
    return (
        <>
            <div className="btn-group btn-group-lg gap-1 pt-3">
                <button id="play" className="btn btn-secondary" title="Play" onClick={onPlay}><BsFillPlayFill /></button>
                <button id="stop" className="btn btn-secondary" title="Pause" onClick={onPause}><BsFillPauseFill /></button>
                <button id="process" className="btn btn-secondary">Preprocess</button>
                <button id="process_play" className="btn btn-secondary">Proc & Play</button>
            </div>
        </>
    );
}

export default PlayButtons;