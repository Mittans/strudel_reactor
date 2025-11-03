import { useState } from "react";

function VolumeSlider({volume, setVolume}) {
  return (
    <div className="d-flex align-items-center gap-4">
      <label htmlFor="volumeSlider" className="mb-0 text-white"><strong>Volume (Gain)</strong></label>
      <input id="volumeSlider" type="range" className="form-range" min="0" max="10" step="0.1" value={volume} onChange={(e) => setVolume(e.target.value)} style={{ width: '400px' }} />
      <span className="text-white">{volume}</span>
    </div>
  );
}

export default VolumeSlider;