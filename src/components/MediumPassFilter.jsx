function MediumPassFilter({ setMediumPassState, Proc }) {
    // Sets the filter value to the value matched on the range
    //Processes change
    const AllMediumPassFilter = (value) => {
        setMediumPassState(value);
        Proc();
    };

    // Displays a range for the filter value to be changed by.
    return (
        <div>
            <div>
                <label htmlFor="MPFilter" className="form-label">
                    Medium-pass Filter:
                </label>
                <input
                    type="range"
                    className="form-range"
                    id="MediumPassFilter"
                    min={0}
                    max={20000}
                    step={100}
                    onChange={(event) => AllMediumPassFilter(event.target.value)}
                ></input>
            </div>
        </div>
    );
}

export default MediumPassFilter;
