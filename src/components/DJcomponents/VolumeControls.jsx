function VolumeControls({ localVolume, handleVolumeChange }) {

    return (
        <>
            {/* Volume */}
            <div className="input-group mb-3">
                <label htmlFor="volume_range" className="form-label"><strong>Volume</strong></label>
                <input type="range" className="form-range" min="0" max="2" step="0.01" value={localVolume}
                    onChange={handleVolumeChange} id="volume_range" />
            </div>
        </>
    );
}

export default VolumeControls;
