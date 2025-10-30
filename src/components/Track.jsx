function Track({ trackName }) {
    return (
        <div>
            <label htmlFor="Track" className="form-label">
                {trackName}:
            </label>
            <div className="row">
                <div style={{ width: "100%" }}>
                    <input type="range" className="form-range" id={trackName} onChange={""}></input>
                </div>
            </div>
        </div>
    );
}

export default Track;
