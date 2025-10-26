function ControlPanel({ onProc, onProcAndPlay, onPlay, onStop }){

    return (
        <>
            <div className="controlPanel bg-dark text-center py-3">
                <span style={{color: 'white'}}><h4>Strudel Demo</h4></span>
                <div className="container">
                    <div className="d-flex justify-content-center flex-wrap gap-3">
                        <button id="process" className="btn btn-outline-primary px-4" onClick={onProc}>
                            Preprocess
                        </button>
                        <button id="process_play" className="btn btn-outline-primary px-4" onClick={onProcAndPlay}>
                            Proc & Play
                        </button>
                        <button id="play" className="btn btn-outline-primary px-4" onClick={onPlay}>
                            Play
                        </button>
                        <button id="stop" className="btn btn-outline-primary px-4" onClick={onStop}>
                            Stop
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ControlPanel