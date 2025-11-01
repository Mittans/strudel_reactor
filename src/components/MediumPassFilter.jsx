function MediumPassFilter({ setMediumPassState, Proc }) {
    const AllMediumPassFilter = (value) => {
        setMediumPassState(value);
        Proc();
    };
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
