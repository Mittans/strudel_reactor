function Reverb({
    setRoomState,
    Proc,
    setRoomLowPassState,
    setRoomFadeState,
    setRoomDecayState,
    setRoomSustainState,
}) {
    const Room = (value) => {
        setRoomState(value);
        Proc();
    };
    const RoomLowPass = (value) => {
        setRoomLowPassState(value);
        Proc();
    };
    const Fade = (value) => {
        setRoomFadeState(value);
        Proc();
    };
    const Decay = (value) => {
        setRoomDecayState(value);
        Proc();
    };
    const Sustain = (value) => {
        setRoomSustainState(value);
        Proc();
    };

    return (
        <div>
            <div>
                <label htmlFor="Room" className="form-label">
                    Room:
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="Room"
                    min={0}
                    max={1}
                    step={0.05}
                    onChange={(event) => Room(event.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="Decay" className="form-label">
                    Decay:
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="Decay"
                    min={0}
                    max={30}
                    step={0.1}
                    onChange={(event) => Decay(event.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="Fade" className="form-label">
                    Fade:
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="Fade"
                    min={0}
                    max={30}
                    step={0.1}
                    onChange={(event) => Fade(event.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="RoomLowPass" className="form-label">
                    Room Low-Pass Filter:
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="RoomLowPassFilter"
                    min={0}
                    max={20000}
                    step={100}
                    onChange={(event) => RoomLowPass(event.target.value)}
                ></input>
            </div>
            <div>
                <label htmlFor="Sustain" className="form-label">
                    Sustain:
                </label>
                <input
                    type="range"
                    className="form-range"
                    min={0}
                    max={1}
                    step={0.05}
                    id="Sustain"
                    onChange={(event) => Sustain(event.target.value)}
                ></input>
            </div>
        </div>
    );
}

export default Reverb;
