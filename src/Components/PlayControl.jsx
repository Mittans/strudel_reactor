

function PlayControl({ volume, onVolumeChange }) {

    return (
        <> {/* React Fragment lets us group elements without an extra div */}

            <div className="container p-4 rounded-4 shadow-sm bg-light">

                <h5 className="text-center mb-4 fw-bold">
                    <i className="bi bi-file-earmark-music me-2"></i>
                    Play Control Panel
                </h5>


                <div className="input-group mb-3">
                    <span className="input-group-text" id="cpm_label">SetCPM</span>
                    <input type="number" className="form-control" id="cpm_text_input" placeholder="120" aria-label="120" aria-describedby="cpm_label"
                        min="0"
                        max="500"
                        step="10"
                    />
                </div>


                <div className="p-3 rounded-3 bg-white shadow-sm fw-semibold mb-3">
                    <label htmlFor="volume_range" className="form-label">Volume Slider {volume}%</label>
                    <input type="range" className="form-range" min="0" max="100" value={volume} id="volume_range" onChange={(e) => onVolumeChange(Number(e.target.value))}
                    />
                </div>





                <div className="p-3 rounded-3 bg-white shadow-sm fw-semibold mb-3">
                    <p className="fw-semibold mb-2">Tracks</p>
                    <div className="d-flex flex-wrap gap-3">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="s1" />
                            <label className="form-check-label" htmlFor="s1">S1</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="d1" />
                            <label className="form-check-label" htmlFor="d1">D1</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="checkbox" id="d2" />
                            <label className="form-check-label" htmlFor="d2">D2</label>
                        </div>
                    </div>
                </div>
                


                <div className="d-flex gap-2 mt-3 my-5">
                    <button className="btn btn-secondary">
                        <i className="bi bi-mic-mute-fill"></i> Mute
                    </button>

                    <button className="btn btn-primary">
                        <i className="bi bi-mic-fill"></i>Unmute
                    </button>

                    <button className="btn btn-warning">
                        <i className="bi bi-shuffle"></i> Shuffle
                    </button>
                </div >

            </div >

        </>
    );
}

export default PlayControl;
