import React from 'react'

function SoundControls() {
  return (
    <>
      {/* Volume slider */}
      <div className="my-2">
        <label htmlFor="volumeRange" className="form-label fw-semibold">
          Volume
        </label>
        <input
          type="range"
          className="form-range"
          id="volumeRange"
          min="0"
          max="100"
          step="1"
          defaultValue="60"
        />
      </div>

      {/* Speed slider */}
      <div>
        <label htmlFor="speedRange" className="form-label fw-semibold">
          Speed
        </label>
        <input
          type="range"
          className="form-range"
          id="speedRange"
          min="0.5"
          max="2"
          step="0.25"
          defaultValue="1"
        />
      </div>
    </>
  )
}

export default SoundControls
