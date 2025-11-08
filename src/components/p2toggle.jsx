import { FaPlayCircle, FaVolumeMute } from "react-icons/fa";
export default function P2Toggle({ onChange }) {
    return (
        <div className="form-check" style={{ marginTop: "1rem" }}>
            <h5>P2 Toggle</h5>
            <div>
                <input
                    className="form-check-input"
                    type="radio"
                    name="p2Radio"
                    id="flexRadioP2Default1"
                    defaultChecked
                    onChange={onChange}
                />
                <label className="form-check-label" htmlFor="flexRadioP2Default1">
                    P2: <FaPlayCircle style={{ color: "#27ae60", marginRight: "6px" }} />
                </label>
            </div>

            <div>
                <input
                    className="form-check-input"
                    type="radio"
                    name="p2Radio"
                    id="flexRadioP2Default2"
                    onChange={onChange}
                />
                <label className="form-check-label" htmlFor="flexRadioP2Default2">
                    P2: <FaVolumeMute style={{ color: "#e74c3c", marginRight: "6px" }} />
                </label>
            </div>
        </div>
    );
}
