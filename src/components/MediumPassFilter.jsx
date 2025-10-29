function MediumPassFilter() {
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
                    onChange={MediumPassFilter}
                ></input>
            </div>
        </div>
    );
}

export default MediumPassFilter;
