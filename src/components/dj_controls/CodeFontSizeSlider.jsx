import base from '../BaseSettings';

function CodeFontSizeSlider({ codeFontSize, setCodeFontSize, onHandleGeneric, onHandleFontSize }) {
    return (
        <div className="input-group mb-4">
            <span className="input-group-text menu_label_subject" id="font_label">Font Size</span>
            {/* if nothing additional is added, e is passed directly (think self and python functions) */}
            <input type="range" className="col-lg menu_label_value slider" 
            min={base.FONT_SIZE_SLIDER_MIN} max={base.FONT_SIZE_SLIDER_MAX} value={codeFontSize} 
            step={base.FONT_SIZE_SLIDER_STEP} defaultValue={base.DEFAULT_FONT_SIZE} 
            id="font_size_range" onDragEnd={onHandleFontSize} onChange={(e) => {
                setCodeFontSize(e.target.value);
                onHandleFontSize(e);
            }}/>
            <span className="input-group-text menu_label_subject_minor" id="font_label">{codeFontSize}px</span>
        </div>
    )
}

export default CodeFontSizeSlider;