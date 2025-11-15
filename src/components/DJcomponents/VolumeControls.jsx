function VolumeControls({ localVolume, handleVolumeChange }) {

    return (
        <>
            {/* Volume */}
            <hr className="my-3" />
            <div className="input-group mb-3">
                <label htmlFor="volume_range" className="form-label">Volume</label>
                <input type="range" className="form-range" min="0" max="2" step="0.01" value={localVolume}
                    onChange={handleVolumeChange} id="volume_range" />
            </div>
        </>
    );
}

export default VolumeControls;
