import PlaybackControls from "./PlaybackControls";
import ProcessControls from "./ProcessControls";

function AudioControls({ handlePlay, handleStop, handlePreprocess, handleProcPlay }) {
    return (
        <div className="container-fluid audio-controls">
            <div className="row g-3">
                <PlaybackControls handlePlay={handlePlay} handleStop={handleStop}/>
                <ProcessControls handlePreprocess={handlePreprocess} handleProcPlay={handleProcPlay}/>
            </div>
        </div>
    );
}

export default AudioControls;