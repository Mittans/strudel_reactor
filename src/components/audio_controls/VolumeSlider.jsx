
function VolumeSlider({ volume, setVolume, onHandleVolume}) {
    return (
        <div className="input-group mb-4">
            <span className="input-group-text menu_label_subject" id="volume_label">Volume</span>
            {/* if nothing additional is added, e is passed directly (think self and python functions) */}
            <input type="range" className="form-control menu_label_value" min="0" max="1" value={volume} step="0.01" defaultValue="0.5" id="volume_range" onChange={(e) => {
                setVolume(e.target.value);
                onHandleVolume(e);
            }}/>
            <span className="input-group-text menu_label_value" id="volume_label">{(volume*100).toFixed(0)}%</span>
        </div>
    )
}

export default VolumeSlider;