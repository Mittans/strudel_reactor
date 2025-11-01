function HighPassFilter({ setHighPassState, Proc }) {
    const AllHighPassFilter = (value) => {
        setHighPassState(value);
        Proc();
    };
    return (
        <div>
            <div>
                <label htmlFor="HPFilter" className="form-label">
                    High-pass Filter:
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="HighPassFilter"
                    min={0}
                    max={20000}
                    step={100}
                    onChange={(event) => AllHighPassFilter(event.target.value)}
                ></input>
            </div>
        </div>
    );
}

export default HighPassFilter;
