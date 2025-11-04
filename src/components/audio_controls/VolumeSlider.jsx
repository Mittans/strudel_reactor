import base from '../BaseSettings';

function VolumeSlider({ volume, setVolume, onHandleVolume }) {
    return (
        <div className="input-group mb-4">
            <span className="input-group-text menu_label_subject" id="volume_label">Volume</span>
            {/* if nothing additional is added, e is passed directly (think self and python functions) */}
            <input type="range" className="col-lg menu_label_value slider" min={base.VOLUME_MIN} max={base.VOLUME_MAX} 
            value={volume} defaultValue={base.DEFAULT_VOLUME} id="volume_range" step={base.VOLUME_SLIDER_STEP} onChange={(e) => {
                setVolume(e.target.value);
                onHandleVolume(e);
            }}/>
            <span className="input-group-text menu_label_subject_minor" id="volume_label">{(volume*100).toFixed(0)}%</span>
        </div>
    )
}

export default VolumeSlider;