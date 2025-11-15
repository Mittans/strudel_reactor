import { useState } from "react";

function DjControls({ onProc }) {

    const [instrumentName, setInstrumentName] = useState("");

    function radioChange() {
        onProc();
    }

    return (
        <>
            {/* <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={radioChange} defaultChecked />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                    p1: ON
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={radioChange} />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                    p1: HUSH
                </label>
            </div> */}
            <div className="card">
                <div className="card-body text-white" style={{ backgroundColor: "grey", borderRadius: "10px"}}>
                    <label htmlFor="instrumentInput" className="form-label">Instrument Name</label>
                    <div style={{ marginBottom: "10px" }}></div>
                    <input type="text" className="form-control mb-3" id="instrumentInput" placeholder="Enter Instrument Name" value={instrumentName} onChange={(e) => setInstrumentName(e.target.value)}/>

                    <label htmlFor="exampleSlider" className="form-label">Example Slider</label>
                    <input type="range" id="exampleSlider" className="form-range mb-3" min="0" max="100" />

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="onCheck" />
                        <label class="form-check-label" for="onCheck">
                            {instrumentName} ON
                        </label>
                        </div>
                        <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="hushCheck" />
                        <label class="form-check-label" for="hushCheck">
                            {instrumentName} HUSH
                        </label>
                    </div>
                </div>
            </div>
            <br/>
            <button class="btn btn-primary w-100">+</button>
        </>
    )
}

export default DjControls;