import React from "react";
import P1Toggle from "./p1toggle";
import P2Toggle from "./p2toggle";
import VolumeControl from "./volumeControl";
export default function TrackControls({ onTrackChange, onVolumeChange }) {
    return (
        <div className="track-controls" style={{ textAlign: "center" }}>
            <h4 style={{ marginBottom: "1rem" }}>Track Controls</h4>

            {/* P1 and P2 Toggle Switches */}
            <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>

                {/*// onTrackChange: callback triggered when a toggle is changed*/}
                <P1Toggle onChange={onTrackChange} />
                <P2Toggle onChange={onTrackChange} />
            </div>

            {/* Global Volume Control */}
            {/*onVolumeChange: callback triggered when volume is changed*/}
            <VolumeControl defaultValue={0.3} onVolumeChange={onVolumeChange} />
        </div>
    );
}
