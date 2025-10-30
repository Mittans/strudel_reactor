import React from 'react';

export default function TrackControl({ onProcess, onProcessPlay, onPlay, onStop }) {
    return (
        <nav style={{ display: "flex", margin: "0 auto", alignItems: "center", padding: "8px", gap: "15px", width: "max-content" }} >
            <IconButton icon="⚙️" label="Preprocess" onClick={onProcess} />
            {/*<IconButton icon="⚙️" label="Proc & Play" onClick={onProcessPlay} />*/}
            <IconButton icon="▶" label="Play" onClick={onPlay} />
            <IconButton icon="⏹" label="Stop" onClick={onStop} />
            {/* custom icon for Proc & Play */}
            <IconButton icon={
                <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                    <path
                        d="M29,17a12,12 0 1,1 -4.5,-9.4"
                        stroke="#3f51b5" strokeWidth="2.4" fill="none" />
                    <polygon
                        points="15,12 23,17 15,22"
                        fill="#3f51b5"
                        stroke="none" />
                    <polyline points="23,7 27,7 27,11"
                        fill="none" stroke="#3f51b5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            }
                label="Proc & Play"
                onClick={onProcessPlay}
            />
        </nav>
    );
}
        function IconButton ({ icon, label, onClick }) {
        return (
            <div style={{ position: "relative" }}>
                <button style={iconBtnStyle} onClick={onClick}
                    onMouseEnter={e => {
                        const tooltip = e.currentTarget.nextSibling;
                        tooltip.style.opacity = 1;
                    }}
                    onMouseLeave={e => {
                        const tooltip = e.currentTarget.nextSibling;
                        tooltip.style.opacity = 0;
                    }} >
                    {icon}
                </button>
                <div style={tooltipStyle}>{label}</div>
            </div>
        );
    }

    const iconBtnStyle = {
        background: "#fff",
        border: "none",
        borderRadius: "50%",
        padding: "11px 15px",
        fontSize: "28px",
        boxShadow: "0 1px 4px #0002",
        cursor: "pointer",
        transition: "background 0.15s",
        outline: "none",
        position: "relative"
    };

    const tooltipStyle = {
        opacity: 0,
        position: "absolute",
        top: -30,
        left: "50%",
        transform: "translateX(-50%)",
        background: "#222",
        color: "#fff",
        padding: "4px 12px",
        borderRadius: "7px",
        pointerEvents: "none",
        fontSize: "14px",
        zIndex: 2,
        whiteSpace: "nowrap",
        transition: "opacity 0.15s"
    };
