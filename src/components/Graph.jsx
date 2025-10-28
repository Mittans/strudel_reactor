import React from "react";

function Graph({ showGraph, onClose }) {
    if (!showGraph) return null;

    return (
        <div className="modal-overlay"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}>
        <div className="modal-content"
            style={{
            background: "#1e1e1e",
            color: "#fff",
            borderRadius: "8px",
            padding: "1.5rem",
            width: "90%",
            maxWidth: "500px",
            boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
            }}>
            <h2 style={{ marginTop: 0 }}>Strudel Graph</h2>
            <p>This is where the graph visualization would be rendered.</p>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "1.5rem",
                    gap: "0.5rem",
                }}
            >
            <button
                onClick={onClose}
                style={{
                background: "#333",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                }}
            >
                Close
            </button>
        </div>
      </div>
    </div>
  );
}

export default Graph;
