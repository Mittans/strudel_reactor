import "./PlayButtons.css";

// This is the play and stop feature component which is responsible for playing the songtext in the textarea
// by evaluting the strudel text which all happens in the main brain in app.js. Here we only use the onclick 
// in the button tags to trigger the onPlay and onStop functions using the props on every click.
function PlayButtons({ onPlay, onStop }) {
    return (
        <>
            <div className="btn-group" id="play-stop-grp" role="group" aria-label="Basic mixed styles example">
                <button id="play" className="btn btn-outline-primary" onClick={onPlay}>▶️</button>
                <button id="stop" className="btn btn-outline-primary" onClick={onStop}>⏹️</button>
            </div>
        </>
    );
}

export default PlayButtons;