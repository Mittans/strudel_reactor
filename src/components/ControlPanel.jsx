import '../css/ControlPanel.css';

function ControlPanel({ onProc, onProcAndPlay, onPlay, onStop, onGraphToggle }){

    return (
        <>
            <div className="controlPanel text-center" >
                <h1 style={{ 
                    color: '#ce2a2aff', 
                    margin: '0 0 1rem 0', 
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                }}>
                    🎵 Strudel Live Coding Studio 🎵
                </h1>
                <div className="d-flex justify-content-center flex-wrap gap-3 py-3">
                    <button id="process" className="btn px-4" onClick={onProc}>
                        🔄 Preprocess
                    </button>
                    <button id="process_play" className="btn px-4" onClick={onProcAndPlay}>
                        ▶️🔄 Proc & Play
                    </button>

                    <button id="play" className="btn px-4" onClick={onPlay}>
                        ▶️ Play
                    </button>

                    <button id="stop" className="btn px-4" onClick={onStop}>
                        ⏹ Stop
                    </button>

                    <button id="graph" className="btn px-4" onClick={onGraphToggle}>
                        👁 View Graph
                    </button>
                </div>
            </div>
        </>
    )
}

export default ControlPanel