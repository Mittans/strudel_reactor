import React from "react";

export default function OutputControl() {
    return (
        <div
            className="card"
            style={{
                background: "linear-gradient(135deg, #181921 40%, #292c3a 100%)",
                color: "#e3e8ef",
                minHeight: "220px",
                maxHeight: "380px",
                overflowY: "auto",
                padding: "18px 20px",
                borderRadius: "12px",
                boxShadow: "0 2px 12px #18192166",
                transition: "box-shadow 0.2s",
                fontFamily: "Fira Mono, Menlo, Monaco, monospace",
            }}
        >
            <div
                id="editor"
                style={{
                    background: "#232535",
                    borderRadius: "8px",
                    minHeight: "100px",
                    padding: "12px",
                    marginBottom: "14px",
                    boxShadow: "0 1px 4px #0002 inset",
                    overflowX: "auto"
                }}
            />
            <div
                id="output"
                style={{
                    background: "#191b27",
                    borderRadius: "8px",
                    minHeight: "56px",
                    padding: "12px",
                    color: "#aeeffe",
                    fontSize: "15px",
                    boxShadow: "0 1px 4px #0002 inset",
                    overflowX: "auto"
                }}
            />
        </div>
    );
}
