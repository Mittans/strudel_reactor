function HighPassFilter() {
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
                    onChange={HighPassFilter}
                ></input>
            </div>
        </div>
    );
}

export default HighPassFilter;
