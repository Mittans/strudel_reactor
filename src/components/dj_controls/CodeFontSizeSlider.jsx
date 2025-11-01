
function CodeFontSizeSlider({ codeFontSize, setCodeFontSize, onHandleGeneric, onHandleFontSize }) {
    return (
        <div className="input-group mb-4">
            <span className="input-group-text menu_label" id="font_label">Font Size</span>
            {/* if nothing additional is added, e is passed directly (think self and python functions) */}
            <input type="range" className="form-control" min="6" max="40" value={codeFontSize} step="1" defaultValue="18" id="font_size_range" onDragEnd={onHandleFontSize} onChange={(e) => {
                setCodeFontSize(e.target.value);
            }}/>
            <span className="input-group-text" id="font_label" style={{ width: 70 }}>{codeFontSize}</span>
        </div>
    )
}

export default CodeFontSizeSlider;