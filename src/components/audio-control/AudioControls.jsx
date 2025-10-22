import PlaybackControls from "./PlaybackControls";
import ProcessControls from "./ProcessControls";

function AudioControls() {
    return (
        <>
            <nav>
                <ProcessControls/>
                <br />
                <PlaybackControls/>
            </nav>
        </>
    )
}

export default AudioControls;