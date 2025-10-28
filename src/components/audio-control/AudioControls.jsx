import PlaybackControls from "./PlaybackControls";
import ProcessControls from "./ProcessControls";
import TempoInput from "./TempoInput";
import VolumeSlider from "./VolumeSlider";

function AudioControls({ handlePlay, handleStop, handlePreprocess, handleProcPlay }) {
    return (
        <div className="container-fluid audio-controls">
            <div className="row g-3 mb-4">
                <PlaybackControls handlePlay={handlePlay} handleStop={handleStop}/>
                <ProcessControls handlePreprocess={handlePreprocess} handleProcPlay={handleProcPlay}/>
            </div>
            <div className="row g-3 mb-4">
                <TempoInput/>    
            </div>
            <div className="row g-3">
                <VolumeSlider/>
            </div>
        </div>
    );
}

export default AudioControls;