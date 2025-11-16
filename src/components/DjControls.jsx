import { useState } from "react";


function DjControls() {

    const [selected, setSelected] = useState("");

    return (
        <div style={{ backgroundColor: "grey", padding: "10px", borderRadius: "10px", color: "white"}}>
            <label htmlFor="instrumentNameInput">Instrument Name </label>
            <input type="text" id="instrumentNameInput" placeholder="Enter instrument name" style={{ display: "block", marginBottom: "10px", width: "100%" }}></input>
            <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "10px" }}>
                <div>
                    <input type="checkbox" id="onCheck" checked={selected === "ON"} onChange={() => setSelected(selected === "ON" ? "" : "ON")} />
                    <label htmlFor="onCheck" style = {{ marginLeft: "5px" }}>ON</label>
                </div>
                <div>
                    <input type="checkbox" id="hushCheck" checked={selected === "HUSH"} onChange={() => setSelected(selected === "HUSH" ? "" : "HUSH")} />
                    <label htmlFor="hushCheck" style = {{ marginLeft: "5px" }}>HUSH</label>
                </div>
            </div>           
        </div>
    );
};

export default DjControls;