import { useState } from 'react';

function SoundControls() {
  const [volume, setVolume] = useState(60);
  const [speed, setSpeed] = useState(1);

  return (
    <>
      {/* Volume slider */}
      <div className="mb-2">
        <label htmlFor="volumeRange" className="form-label fw-semibold d-flex">
          <span className="me-3">Volume:</span>
          <span>{volume}</span>
        </label>
        <input
          type="range"
          className="form-range"
          id="volumeRange"
          min="0"
          max="100"
          step="1"
          defaultValue="60"
          onChange={(e) => setVolume(e.target.value)}
        />
      </div>

      {/* Speed slider */}
      <div>
        <label htmlFor="speedRange" className="form-label fw-semibold d-flex">
          <span className="me-3">Speed:</span>
          <span>{speed}x</span>
        </label>
        <input
          type="range"
          className="form-range"
          id="speedRange"
          min="0.5"
          max="2"
          step="0.25"
          defaultValue="1"
          onChange={(e) => setSpeed(e.target.value)}
        />
      </div>
    </>
  )
}

export default SoundControls
