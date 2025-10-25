import PlaybackControls from "./PlaybackControls";
import ProcessControls from "./ProcessControls";

function AudioControls({ handlePlay, handleStop, handlePreprocess, handleProcPlay }) {
    return (
        <nav>
            {/* <button onClick={handlePreprocess}>Preprocess</button>
            <button onClick={handleProcPlay}>Proc & Play</button>
            <br />
            <button onClick={handlePlay}>Play</button>
            <button onClick={handleStop}>Stop</button> */}
            <PlaybackControls handlePlay={handlePlay} handleStop={handleStop}/>
            <br/>
            <ProcessControls handlePreprocess={handlePreprocess} handleProcPlay={handleProcPlay}/>
        </nav>
    );
}

export default AudioControls;