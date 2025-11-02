import TrackControls from "./TrackControls";
import SoundControls from "./SoundControls";
import EffectsControls from "./EffectsControls";

function DJControls({tracks, onTrackChange}) {

  return (
    <div className="card bg-dark text-light border-0 rounded-4 px-5 py-4">
      <h5 className="card-title mb-3">DJ Controls</h5>
      <TrackControls tracks={tracks} onTrackChange={onTrackChange}/>
      <SoundControls />
      <EffectsControls />
    </div>
  );
}

export default DJControls;
