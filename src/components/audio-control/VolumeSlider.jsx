import { useState } from "react";

function VolumeSlider() {
  // Default volume of 50
  const [volume, setVolume] = useState(50);

  return (
    <div className="d-flex align-items-center gap-4">
      <label htmlFor="volumeSlider" className="mb-0 text-white"><strong>Volume</strong></label>
      <input id="volumeSlider" type="range" className="form-range" min="0" max="100" value={volume} onChange={(e) => setVolume(e.target.value)} style={{ width: '400px' }} />
      <span className="text-white">{volume}</span>
    </div>
  );
}

export default VolumeSlider;