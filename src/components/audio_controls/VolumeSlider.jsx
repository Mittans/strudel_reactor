
function VolumeSlider({ volume, setVolume }) {
    return (
        <div className="input-group mb-4">
            <span className="input-group-text menu_label" id="volume_label">Volume</span>
            {/* if nothing additional is added, e is passed directly (think self and python functions) */}
            <input type="range" className="form-control" min="0" max="1" value={volume} step="0.01" defaultValue="0.5" id="volume_range" onChange={(e) => {
                setVolume(e.target.value);
            }}/>
            <span className="input-group-text" id="volume_label" style={{ width: 70 }}>{(volume*100).toFixed(0)}%</span>
        </div>
    )
}

export default VolumeSlider;