import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { subscribe, unsubscribe } from "../assets/console-monkey-patch";

function Graph({ showGraph, onClose }) {
    const svgRef = useRef(null);
    const [dataPoints, setDataPoints] = useState([]);
    const [debugInfo, setDebugInfo] = useState("Waiting for data...");
    const [visualMode, setVisualMode] = useState("pitch"); // pitch, cutoff, attack

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr("width", "100%")
            .attr("height", 300);

        const margin = { top: 20, right: 20, bottom: 30, left: 50 };

        // Note to MIDI number mapping
        const noteToMidi = (noteStr) => {
            const noteMap = { c: 0, d: 2, e: 4, f: 5, g: 7, a: 9, b: 11 };
            const match = noteStr.match(/([a-g])(b|#)?(\d+)/i);
            if (!match) return null;
            
            const note = noteMap[match[1].toLowerCase()];
            const accidental = match[2] === 'b' ? -1 : match[2] === '#' ? 1 : 0;
            const octave = parseInt(match[3]);
            
            return (octave + 1) * 12 + note + accidental;
        };

        function extractValue(line, mode) {
            if (mode === "pitch") {
                // Extract note like "note:d4"
                const noteMatch = line.match(/note:([a-g]b?\d+)/i);
                if (noteMatch) {
                    return noteToMidi(noteMatch[1]);
                }
            } else if (mode === "cutoff") {
                // Extract cutoff like "cutoff:300"
                const cutoffMatch = line.match(/cutoff:(\d+)/);
                if (cutoffMatch) {
                    return parseFloat(cutoffMatch[1]);
                }
            } else if (mode === "attack") {
                // Extract attack like "attack:0.1"
                const attackMatch = line.match(/attack:([\d.]+)/);
                if (attackMatch) {
                    return parseFloat(attackMatch[1]);
                }
            }
            return null;
        }

        function updateGraph(logArray) {
            console.log("Graph received data:", logArray.length, "entries");
            
            if (!logArray || logArray.length === 0) {
                setDebugInfo("No data received yet");
                return;
            }

            const width = svgRef.current?.clientWidth || 600;
            const height = 300;

            // Parse values based on current mode
            const parsed = logArray
                .map(line => extractValue(line, visualMode))
                .filter(v => v !== null);

            if (parsed.length === 0) {
                setDebugInfo(`No ${visualMode} data found in logs`);
                return;
            }

            setDataPoints(parsed);
            const minVal = d3.min(parsed);
            const maxVal = d3.max(parsed);
            setDebugInfo(
                `${visualMode.toUpperCase()}: ${parsed.length} points | ` +
                `Range: ${minVal?.toFixed(1)} - ${maxVal?.toFixed(1)}`
            );

            // x scale (time)
            const x = d3.scaleLinear()
                .domain([0, Math.max(parsed.length - 1, 1)])
                .range([margin.left, width - margin.right]);

            // y scale
            const y = d3.scaleLinear()
                .domain([minVal - 2, maxVal + 2])
                .range([height - margin.bottom, margin.top]);

            // Clear old content
            svg.selectAll("*").remove();

            // Add background
            svg.append("rect")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "#0a0a0a");

            // Add grid lines
            const yAxis = d3.axisLeft(y).ticks(8);
            svg.append("g")
                .attr("transform", `translate(${margin.left},0)`)
                .call(yAxis)
                .attr("color", "#444")
                .style("font-size", "10px");

            // X axis
            const xAxis = d3.axisBottom(x).ticks(10);
            svg.append("g")
                .attr("transform", `translate(0,${height - margin.bottom})`)
                .call(xAxis)
                .attr("color", "#444")
                .style("font-size", "10px");

            // Line generator
            const line = d3.line()
                .x((d, i) => x(i))
                .y(d => y(d))
                .curve(d3.curveStepAfter); // Step for musical notes

            // Area under line
            const area = d3.area()
                .x((d, i) => x(i))
                .y0(height - margin.bottom)
                .y1(d => y(d))
                .curve(d3.curveStepAfter);

            svg.append("path")
                .datum(parsed)
                .attr("fill", "rgba(0, 255, 100, 0.15)")
                .attr("d", area);

            // Draw line
            svg.append("path")
                .datum(parsed)
                .attr("fill", "none")
                .attr("stroke", "#0f0")
                .attr("stroke-width", 2)
                .attr("d", line);

            // Draw points
            svg.selectAll("circle")
                .data(parsed)
                .enter()
                .append("circle")
                .attr("cx", (d, i) => x(i))
                .attr("cy", d => y(d))
                .attr("r", 3)
                .attr("fill", "#ff0")
                .attr("stroke", "#000")
                .attr("stroke-width", 1);
        }

        // Listener for monkey-patch data
        const listener = (e) => {
            updateGraph(e.detail);
        };

        subscribe("d3Data", listener);

        return () => unsubscribe("d3Data", listener);
    }, [visualMode, showGraph]);

    if (!showGraph) return null;

    return (
        <div className="modal-overlay"
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
            }}>
            <div className="modal-content"
                style={{
                    background: "#f0f0f0",
                    color: "#333",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    width: "90%",
                    maxWidth: "800px",
                    boxShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
                }}>
                <h2 style={{ marginTop: 0 }}>Strudel Visualizer</h2>
                
                {/* Mode selector */}
                <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
                    <button
                        onClick={() => setVisualMode("pitch")}
                        style={{
                            background: visualMode === "pitch" ? "#0a0" : "#333",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "0.4rem 0.8rem",
                            cursor: "pointer",
                            fontSize: "0.85rem"
                        }}
                    >
                        Note Pitch
                    </button>
                    <button
                        onClick={() => setVisualMode("cutoff")}
                        style={{
                            background: visualMode === "cutoff" ? "#0a0" : "#333",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "0.4rem 0.8rem",
                            cursor: "pointer",
                            fontSize: "0.85rem"
                        }}
                    >
                        Cutoff
                    </button>
                    <button
                        onClick={() => setVisualMode("attack")}
                        style={{
                            background: visualMode === "attack" ? "#0a0" : "#333",
                            color: "#fff",
                            border: "none",
                            borderRadius: "4px",
                            padding: "0.4rem 0.8rem",
                            cursor: "pointer",
                            fontSize: "0.85rem"
                        }}
                    >
                        Attack
                    </button>
                </div>

                <div style={{ 
                    background: "#0a0a0a", 
                    padding: "0.5rem", 
                    borderRadius: "4px",
                    marginBottom: "1rem",
                    fontSize: "0.85rem",
                    fontFamily: "monospace",
                    color: "#0f0"
                }}>
                    {debugInfo}
                </div>

                <svg ref={svgRef} style={{ 
                    width: "100%", 
                    height: "300px",
                    background: "#0a0a0a",
                    borderRadius: "4px"
                }}></svg>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "1.5rem",
                    }}
                >
                    <div style={{ fontSize: "0.85rem", color: "#888" }}>
                        Events captured: {dataPoints.length}
                    </div>
                    <button
                        onClick={onClose}
                        style={{
                            background: "red",
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