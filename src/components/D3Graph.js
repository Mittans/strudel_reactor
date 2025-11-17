import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getD3Data } from "../console-monkey-patch";

function extractGain(log) {
    if (!log || typeof log !== "string") return 0;
    const match = log.match(/gain:([0-9.]+)/);
    return match ? parseFloat(match[1]) : 0;
}

export default function D3Graph() {
    const [logData, setLogData] = useState([]);
    const svgRef = useRef();
    const maxItems = 50;

    useEffect(() => {
        function handleEvent(event) {
            setLogData(event.detail.slice(-maxItems));
        }
        document.addEventListener("d3Data", handleEvent);
        setLogData(getD3Data().slice(-maxItems));
        return () => document.removeEventListener("d3Data", handleEvent);
    }, []);

    useEffect(() => {
        const width = 350, height = 180, margin = 20;
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();
        svg.attr("width", width).attr("height", height);

        let gains = logData.map(extractGain);
        if (gains.length < maxItems)
            gains = [...Array(maxItems - gains.length).fill(0), ...gains];

        const x = d3.scaleBand()
            .domain(d3.range(maxItems))
            .range([margin, width - margin])
            .padding(0.45);

        const y = d3.scaleLinear()
            .domain([0, 3.5])
            .range([height - margin, margin]);

        svg.append("g")
            .attr("transform", `translate(0,${height - margin})`)
            .call(d3.axisBottom(x).tickValues([0, 10, 20, 30, 40]))
            .attr("font-size", "8px");

        svg.append("g")
            .attr("transform", `translate(${margin},0)`)
            .call(d3.axisLeft(y).ticks(5))
            .attr("font-size", "8px");

        svg.selectAll("rect")
            .data(gains)
            .join("rect")
            .attr("x", (_, i) => x(i))
            .attr("y", d => y(d))
            .attr("width", x.bandwidth())
            .attr("height", d => height - margin - y(d))
            .attr("fill", "#4da3ff");

        svg.append("text")
            .attr("x", width - margin)
            .attr("y", height - 1)  // just below the axis line
            .attr("text-anchor", "end")  // align text to the most right
            .attr("font-size", "8px")
            .attr("font-weight", "bold")
            .attr("fill", "#000")
            .text("Index");

        svg.append("text")
            .attr("x", margin)       // align with left margin (y-axis line)
            .attr("y", margin - 6)   // slightly above top of chart area
            .attr("text-anchor", "start") // left align
            .attr("font-size", "8px")
            .attr("font-weight", "bold")
            .attr("fill", "#000")
            .text("Gain");


    }, [logData]);

    const latest = logData.length ? extractGain(logData[logData.length - 1]) : 0;

    return (
        <div style={{ maxWidth: 330, padding: 10 }}>
            <h3 style={{ margin: "0 0 6px 0", fontSize: "1rem" }}>Gain Graph</h3>
            <svg ref={svgRef} style={{ display: "block", margin: "auto" }} />
            <div style={{ marginTop: 6, fontSize: "0.9rem" }}>
            </div>
        </div>
    );
}
