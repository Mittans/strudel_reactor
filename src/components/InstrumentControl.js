import React from 'react';

export default function InstrumentControl({ onStateChange, radioValue }) {
    const options = ["ON", "HUSH"];

    return (
        <div style={{ display: "flex", gap: "16px", padding: "10px", background: "#f7f7f7", borderRadius: "12px", width: "fit-content" }}>
            {options.map((option) => ( //map over options to create radio buttons
                <label
                    key={option}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "8px 30px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        backgroundColor: radioValue === option ? "#4f46e5" : "#e0e0e0",
                        color: radioValue === option ? "#fff" : "#333",
                        fontWeight: 500,
                        transition: "all 0.2s ease", //smooth transition for background and color
                    }}
                >
                    <input
                        type="radio"
                        name="instrumentState"
                        value={option}
                        checked={radioValue === option}
                        onChange={() => onStateChange(option)} //call onStateChange with the selected option
                        style={{ display: "none" }}
                    />
                    {`p1: ${option}`}
                </label>
            ))}
        </div>
    );
}
