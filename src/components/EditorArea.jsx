import DjControls from "./DjControls";

function EditorArea({ onProc }) {
    return (
        <>
            {/* <div className="col-md-8">
                <div id="editor" />
                <div id="output" />
            </div> */}
            <div className="col-md-12">
                <DjControls onProc={onProc}/>
            </div>
        </>
    )
}

export default EditorArea;