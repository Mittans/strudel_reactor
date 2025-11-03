import TrackControls from "./TrackControls";
import SoundControls from "./SoundControls";
import EffectsControls from "./EffectsControls";

function DJControls({tracks, onTrackChange}) {

  return (
    <div className="card bg-dark text-light border-0 rounded-4 px-5 py-4 mt-3">
      <h5 className="card-title mb-3">DJ Controls</h5>
      <SoundControls />
      <TrackControls tracks={tracks} onTrackChange={onTrackChange}/>
      <EffectsControls />

      <div className="d-flex gap-3 mt-3 justify-content-end">
        <button className="preset-btn">Save</button>
        <button className="preset-btn">Load</button>
      </div>
    </div>
  );
}

export default DJControls;
