function PlayControls({ volChange, onVolChange, speedChange, onSpeedChange }) {
    return (
        <>
            <div className="bg-black p-2 rounded">
                {/* Speed */}
                <div className="input-group mb-3">

                    <span className="input-group-text" id="speed_label">Set Speed</span>
                    <input type="text" className="form-control" id="speedInput" onChange={onSpeedChange} placeholder="120" aria-label="speed" aria-describedby="speed_label" />
                </div>

                {/* Volume */}
                <label htmlFor="volumeRange" className="form-label">Volume</label>
                <input type="range" className="form-range" min="0" max="1" step="0.01" onMouseUp={onVolChange} id="customRange3" />

                {/* Instruments */}
                {/* TODO make seperate component */}
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="instruments1" />
                    <label className="form-check-label text-light" htmlFor="instruments1">
                        Instruments 1
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="instruments2" />
                    <label className="form-check-label text-light" htmlFor="instrument2">
                        Instruments 2
                    </label>
                </div>
            </div>
        </>
    );
}

export default PlayControls;