function LowPassFilter() {
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
                    onChange={LowPassFilter}
                ></input>
            </div>
        </div>
    );
}

export default LowPassFilter;
