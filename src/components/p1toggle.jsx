import { FaPlayCircle, FaVolumeMute } from "react-icons/fa";
export default function P1Toggle({ onChange }) {
    return (
        <div style={{ marginTop: '1rem' }}>
            <div className="form-check">
                <input className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    defaultChecked
                    onChange={onChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    P1: <FaPlayCircle style={{ color: "#27ae60", marginRight: "6px" }} />
                </label>
            </div>

            <div className="form-check">
                <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    onChange={onChange}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    P1: <FaVolumeMute style={{ color: "#e74c3c", marginRight: "6px" }} />
                </label>
            </div>
        </div>
    );
}
