import React, { useState } from 'react';

// sound files in public
const DRUM_SOUND_URL_1 = process.env.PUBLIC_URL + "/drum1.mp3";
const LOFI_SOUND_URL_2 = process.env.PUBLIC_URL + "/lofi.mp3";

export default function InstrumentControl({ onStateChange, radioValue }) {
    const options = ["ON", "HUSH"];

    const [drumCount1, setDrumCount1] = useState(0);
    const [drumCount2, setDrumCount2] = useState(0);

    function handleDrumClick1() {
        const audio = new Audio(DRUM_SOUND_URL_1);
        audio.currentTime = 0;
        audio.play();

        const newCount = drumCount1 + 1;
        setDrumCount1(newCount < 11 ? newCount : 0);
    }

    function handleDrumClick2() {
        const audio = new Audio(LOFI_SOUND_URL_2);
        audio.currentTime = 0;
        audio.play();

        const newCount = drumCount2 + 1;
        setDrumCount2(newCount < 11 ? newCount : 0);
    }

    return (
        <div style={{ padding: "10px", background: "#f7f7f7", borderRadius: "12px", width: "fit-content" }}>
            <div style={{ display: "flex", gap: "16px" }}>
                {options.map((option) => (
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
                            transition: "all 0.2s ease",
                        }}
                    >
                        <input
                            type="radio"
                            name="instrumentState"
                            value={option}
                            checked={radioValue === option}
                            onChange={() => onStateChange(option)}
                            style={{ display: "none" }}
                        />
                        {`p1: ${option}`}
                    </label>
                ))}
            </div>
            <div style={{ marginTop: "16px", display: "flex", gap: "16px", justifyContent: "center" }}>
                <button
                    onClick={handleDrumClick1}
                    style={{
                        backgroundColor: "#eab308",
                        color: "#3b3b3b",
                        fontWeight: "bold",
                        padding: "8px 20px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "15px",
                        transition: "background 0.2s ease"
                    }}
                >
                    {`Drum  ${drumCount1 > 0 ? drumCount1 : ""}`}
                </button>
                <button
                    onClick={handleDrumClick2}
                    style={{
                        backgroundColor: "#f97316",
                        color: "#fff",
                        fontWeight: "bold",
                        padding: "8px 20px",
                        borderRadius: "8px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "15px",
                        transition: "background 0.2s ease"
                    }}
                >
                    {`Base ${drumCount2 > 0 ? drumCount2 : ""}`}
                </button>
            </div>
        </div>
    );
}
