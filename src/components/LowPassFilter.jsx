function LowPassFilter({ setLowPassState, Proc }) {
    const AllLowPassFilter = (value) => {
        setLowPassState(value);
        Proc();
    };

    return (
        <div>
            <div>
                <label htmlFor="LPFilter" className="form-label">
                    Low-pass Filter:
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="LowPassFilter"
                    min={0}
                    max={20000}
                    step={100}
                    onChange={(event) => AllLowPassFilter(event.target.value)}
                ></input>
            </div>
        </div>
    );
}

export default LowPassFilter;
