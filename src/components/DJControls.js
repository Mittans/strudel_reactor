import TrackControls from "./TrackControls";
import SoundControls from "./SoundControls";
import EffectsControls from "./EffectsControls";

function DJControls({tracks, onTrackChange, onSave, onLoad}) {

  return (
    <div className="card bg-dark text-light border-0 rounded-4 px-5 py-4 mt-3">

      <TrackControls tracks={tracks} onTrackChange={onTrackChange}/>
      <SoundControls />
      <EffectsControls />

      <div className="d-flex gap-3 mt-3 justify-content-end">
        <button className="preset-btn" onClick={onSave}>Save</button>
        <button className="preset-btn" onClick={onLoad}>Load</button>
      </div>
    </div>
  );
}

export default DJControls;
