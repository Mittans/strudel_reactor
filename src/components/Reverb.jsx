function Reverb() {
    return (
        <div>
            <div>
                <label htmlFor="MPFilter" className="form-label">
                    Room:
                </label>
                <input type="range" className="form-range" id="Room" onChange={""}></input>
            </div>
            <div>
                <label htmlFor="MPFilter" className="form-label">
                    Decay:
                </label>
                <input type="range" className="form-range" id="Decay" onChange={""}></input>
            </div>
            <div>
                <label htmlFor="MPFilter" className="form-label">
                    Fade:
                </label>
                <input type="range" className="form-range" id="Fade" onChange={""}></input>
            </div>
            <div>
                <label htmlFor="MPFilter" className="form-label">
                    Room Low-Pass Filter:
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="RoomLowPassFilter"
                    onChange={""}
                ></input>
            </div>
            <div>
                <label htmlFor="MPFilter" className="form-label">
                    Response:
                </label>
                <input type="range" className="form-range" id="Response" onChange={""}></input>
            </div>
        </div>
    );
}

export default Reverb;
