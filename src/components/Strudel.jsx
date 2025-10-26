function Strudel({ onModeChange }) {
    return (
        <>
        <label htmlFor="procControls" className="form-label fw-bold">Preprocessing Controls:</label>
        <div className="procControls">

            <input type="checkbox" className="form-check-input" name="p1_check" onClick={(e) => onModeChange(e.target.checked ? "hush" : "on")} />
            <label className="form-check-label" htmlFor="p1_check">
                    P1 Control
            </label> 

            {/* <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked onChange={() => onModeChange("on")} />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    p1: ON
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={() => onModeChange("hush")} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    p1: HUSH
                </label>
            </div> */}
        </div>
        </>
    );
}

export default Strudel;