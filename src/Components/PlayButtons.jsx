import { useHotkeys } from "react-hotkeys-hook";

function PlayButtons({ editorRef, setIsPlaying }) {

    // MOVED FROM StrudelDemo: Function runs when the Play button is clicked
    const handlePlay = () => {
        // Plays the current Strudel code in the editor
        editorRef.current?.evaluate();
        setIsPlaying(true); // Update state to indicate music is playing
    };

    // MOVED FROM StrudelDemo: Safely play only if editor exists, avoid errors by checking if editorRef.current is not null
    // works even without the null check but just to be safe
    const handleStop = () => {
        editorRef.current?.stop();
        setIsPlaying(false); // Update state to indicate music has stopped
    }

    // Hotkeys for Play and Stop
    useHotkeys("enter", () => {
        handlePlay();
    });

    useHotkeys("space", (e) => {
        e.preventDefault(); // prevent page from scrolling when space is pressed
        handleStop();
    });

    return (
        <>
            <div className="container p-4 rounded-4 shadow-sm glass-card">
                <h5 className="text-center mb-4 fw-bold text-light">
                    Play Buttons
                </h5>

                <div className="d-flex justify-content-center gap-3">
                    <button id="play" className="btn btn-success px-4" onClick={handlePlay}>
                        <i className="bi bi-file-play-fill"></i> Play
                    </button>

                    <button id="stop" className="btn btn-danger px-4" onClick={handleStop}>
                        <i className="bi bi-stop-fill"></i> Stop
                    </button>
                </div>
            </div >
        </>
    );
}

export default PlayButtons;