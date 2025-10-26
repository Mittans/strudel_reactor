import '../css/ControlPanel.css';

function ControlPanel({ onProc, onProcAndPlay, onPlay, onStop }){

    return (
        <>
            <div className="controlPanel text-center py-3">
                <span className="fw-bold" style={{color: 'red'}}><h1>Strudel Demo</h1></span>
                <div className="container">
                    <div className="d-flex justify-content-center flex-wrap gap-3"
                        style={{
                            borderRadius: "8px",
                            fontSize: "1rem",
                            fontWeight: "500",
                            border: "none",
                            color: "white",
                            padding: "0.6rem 1.2rem",
                            cursor: "pointer",
                            hover: { backgroundColor: "green" }
                        }}>
                        <button id="process" className="btn px-4" onClick={onProc}>
                            Preprocess
                        </button>
                        <button id="process_play" className="btn px-4" onClick={onProcAndPlay}>
                            Proc & Play
                        </button>
                        <button id="play" className="btn px-4" onClick={onPlay}>
                            Play
                        </button>
                        <button id="stop" className="btn px-4" onClick={onStop}>
                            Stop
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ControlPanel