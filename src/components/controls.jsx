import { FaPlay, FaStop, FaRedo, FaCogs, FaPlayCircle } from "react-icons/fa";

export default function Controls({ onProcess, onProcPlay, onPlay, onStop, replay }) {
    return (
        <div className="music-controls d-flex justify-content-center align-items-center gap-3 my-3">
            <button className="control-btn" title="Process" onClick={onProcess}><FaCogs /></button>
            <button className="control-btn" title="Proc&Play" onClick={onProcPlay}><FaPlayCircle /></button>
            <button className="control-btn stop-btn" title="Stop" onClick={onStop}><FaStop /></button>
            <button className="control-btn play-btn" title="Play" onClick={onPlay}><FaPlay /></button>
            <button className="control-btn redo-btn" title="Reload" onClick={replay}><FaRedo /></button>    
        </div>
    );
}
