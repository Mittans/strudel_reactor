import { FaPlay, FaStop, FaRedo } from "react-icons/fa";

export default function Controls({ onProcess, onProcPlay, onPlay, onStop, replay }) {
    return (
        <div className="music-controls d-flex justify-content-center align-items-center gap-3 my-3">
            <button className="control-btn" onClick={onProcess}>Process</button>
            <button className="control-btn" onClick={onProcPlay}>Proc&Play</button>
            <button className="control-btn" onClick={onStop}><FaStop /></button>
            <button className="control-btn play-btn" onClick={onPlay}><FaPlay /></button>
            <button className="control-btn" onClick={replay}><FaRedo /></button>    
        </div>
    );
}
