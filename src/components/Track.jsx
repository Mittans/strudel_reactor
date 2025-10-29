function Track({ trackName }) {
    return (
        <div>
            <label htmlFor="Track" className="form-label">
                {trackName}:
            </label>
            <div className="row">
                <div style={{ width: "75%" }}>
                    <input type="range" className="form-range" id={trackName} onChange={""}></input>
                </div>
                <div style={{ width: "15%" }}>
                    <button className="btn btn-outline-primary" onClick={""}>
                        Mute
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Track;
