function HighPassFilter({ setHighPassState, Proc }) {
    // Sets the filter value to the value matched on the range
    //Processes change
    const AllHighPassFilter = (value) => {
        setHighPassState(value);
        Proc();
    };

    // Displays a range for the filter value to be changed by.
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
