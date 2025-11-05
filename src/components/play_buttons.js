import './play_buttons.css'

function play_buttons({ onPlay, onStop }) {
    return (
        <>
            <button id="play" className="btn btn-outline-primary" onClick={onPlay}>PLAY</button>
            <button id="stop" className="btn btn-outline-danger" onClick={onStop}>STOP</button>
        </>
    )
}

export default play_buttons;