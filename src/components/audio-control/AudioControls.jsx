import PlaybackControls from "./PlaybackControls";
import ProcessControls from "./ProcessControls";

function AudioControls({ handlePlay, handleStop, handlePreprocess, handleProcPlay }) {
    return (
        <nav>
            <PlaybackControls handlePlay={handlePlay} handleStop={handleStop}/>
            <br/>
            <ProcessControls handlePreprocess={handlePreprocess} handleProcPlay={handleProcPlay}/>
        </nav>
    );
}

export default AudioControls;