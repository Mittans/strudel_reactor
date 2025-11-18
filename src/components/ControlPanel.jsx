import '../css/ControlPanel.css';

function ControlPanel({ onProc, onProcAndPlay, onPlay, onStop, onGraphToggle }){

    return (
        <>
            <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
            />
            <div className="controlPanel text-center" >
                <h1 className="title-wrapper">
                    <span className='pe-3'><i className="bi bi-music-note-list"></i></span>Strudel Live Coding Studio<span className='ps-3'><i className="bi bi-music-note-list"></i></span>
                </h1>
                <button
                    className="info-btn m-3"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#infoCanvas"
                    data-tooltip="tooltip"
                    title="How to Use Strudel Studio"
                >
                    <i className="bi bi-info-circle"></i> Guide
                </button>
                <div className="d-flex justify-content-center flex-wrap gap-3 py-3">
                    <button id="process" className="btn px-4" onClick={onProc}>
                        <i className="bi bi-arrow-repeat"></i> Preprocess
                    </button>
                    <button id="process_play" className="btn px-4" onClick={onProcAndPlay}>
                        <i className="bi bi-play-circle"></i> Proc & Play
                    </button>

                    <button id="play" className="btn px-4" onClick={onPlay}>
                        <i className="bi bi-play-fill"></i> Play
                    </button>

                    <button id="stop" className="btn px-4" onClick={onStop}>
                        <i className="bi bi-stop-fill"></i> Stop
                    </button>

                    <button id="graph" className="btn px-4" onClick={onGraphToggle}>
                        <i className="bi bi-graph-up"></i> View Graph
                    </button>
                </div>
                
            </div>

            <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="infoCanvas"
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title">How to Use Strudel Studio</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
                </div>

                <div className="offcanvas-body">
                    <p><strong>Basic Navigation:</strong></p>
                    <ul>
                        <li>Type your Strudel pattern in the editor</li>
                        <li>Click <b>Preprocess</b> to check for errors</li>
                        <li>Click <b>Play</b> or <b>Proc & Play</b> to start audio</li>
                        <li>Adjust the <b>BPM slider</b> to change speed</li>
                        <li>Click <b>View Graph</b> to visualize your pattern</li>
                        <li>Click <b>Stop</b> to halt playback</li>
                        <li>Click <b>Strudel REPL</b> to expand strudel editor</li>
                    </ul>

                    <p><strong>Tips:</strong></p>
                    <ul>
                        <li>Try layering multiple patterns for variety</li>
                        <li>Use comments (//) to organize your code</li>
                        <li>To overwrite existing code for a saved preset, simply save again with same name</li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default ControlPanel