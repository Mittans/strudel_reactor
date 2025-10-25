import DjControls from "./DjControls";

function EditorArea({ onProc }) {
    return (
        <>
            <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
                <div id="editor" />
                <div id="output" />
            </div>
            <div className="col-md-4">
                <DjControls onProc={onProc}/>
            </div>
        </>
    )
}

export default EditorArea;