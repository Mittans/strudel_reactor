function Track({ trackName, Volume }) {
    return (
        <div>
            <label htmlFor="Track" className="form-label">
                {trackName}
            </label>
            <div className="row">
                <div style={{ width: "100%" }}>
                    <input
                        type="range"
                        className="form-range"
                        min={0}
                        max={1}
                        step={0.05}
                        id={trackName}
                        onChange={(event) => Volume(trackName, event.target.value)}
                    ></input>
                </div>
            </div>
        </div>
    );
}

export default Track;
