import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { subscribe, unsubscribe } from "../assets/console-monkey-patch";

function Graph({ showGraph, onClose }) {

    const svgRef = useRef(null);

    useEffect(() => {

        const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", 120);

        const margin = { top: 10, right: 10, bottom: 10, left: 10 };

        function updateGraph(logArray) {
            const width = svgRef.current.clientWidth;
            const height = 120;

            // Parse values like: "getTrigger kick 0.42"
            const parsed = logArray.map(line => {
                const parts = line.trim().split(" ");
                const value = parseFloat(parts[parts.length - 1]);
                return isNaN(value) ? 0 : value;
            });

            // x scale
            const x = d3.scaleLinear()
                .domain([0, parsed.length - 1])
                .range([margin.left, width - margin.right]);

            // y scale
            const y = d3.scaleLinear()
                .domain([0, d3.max(parsed) || 1])
                .range([height - margin.bottom, margin.top]);

            // Line generator
            const line = d3.line()
                .x((d, i) => x(i))
                .y(d => y(d))
                .curve(d3.curveMonotoneX);

            // Clear old content
            svg.selectAll("*").remove();

            // Draw path
            svg.append("path")
                .datum(parsed)
                .attr("fill", "none")
                .attr("stroke", "lime")
                .attr("stroke-width", 2)
                .attr("d", line);
        }

        // Listener for monkey-patch data
        const listener = (e) => updateGraph(e.detail);

        subscribe("d3Data", listener);

        return () => unsubscribe("d3Data", listener);

    }, []);

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
                {/* <p>This is where the graph visualization would be rendered.</p> */}
                <svg ref={svgRef} style={{ width: "100%", height: "200px"  }}></svg>

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
