import PlaybackControls from "./PlaybackControls";
import TempoInput from "./TempoInput";
import VolumeSlider from "./VolumeSlider";

function AudioControls({ handlePlay, handleStop, handlePreprocess, handleProcPlay, cpm, setCpm, volume, setVolume}) {
    return (
        <div className="container-fluid audio-controls">
            <div className="row g-3 mb-4">
                <PlaybackControls handlePlay={handlePlay} handleStop={handleStop}/>
            </div>
            <div className="row g-3 mb-4">
                <TempoInput cpm={cpm} setCpm={setCpm}/>    
            </div>
            <div className="row g-3">
                <VolumeSlider volume={volume} setVolume={setVolume}/>
            </div>
        </div>
    );
}

export default AudioControls;