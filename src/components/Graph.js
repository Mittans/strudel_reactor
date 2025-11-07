import * as d3 from "d3";
import { useEffect, useState } from "react";
import { getD3Data } from "../console-monkey-patch";

export default function Graph() {

    const [logArray, setLogArray] = useState([]);     // stores strings
    const maxItems = 50;                              // number of points to show
    const maxValue = 1.0;                             // gain range 0–1
    const updateInterval = 400;                       // ms refresh rate

    // Convert log string to number (extract gain value)
    function LogToNum(input) {
        if (!input) return 0;
        const parts = input.split(/\s+/);
        for (const item of parts) {
            if (item.startsWith("gain:")) {
                const val = parseFloat(item.substring(5));
                return isNaN(val) ? 0 : val;
            }
        }
        return 0;
    }

    // Fetch data every few ms
    useEffect(() => {
        const timer = setInterval(() => {
            const data = getD3Data();        // get all Strudel logs
            if (!data || data.length === 0) return;
            const latest = data[data.length - 1];
            setLogArray(prev => {
                const updated = [...prev, latest];
                if (updated.length > maxItems) updated.shift();
                return updated;
            });
        }, updateInterval);

        return () => clearInterval(timer);
    }, []);

    // Draw D3 line graph
    useEffect(() => {
        const svg = d3.select("#d3graph");
        svg.selectAll("*").remove();

        const w = 600, h = 150, margin = 10;

        const xScale = d3.scaleLinear()
            .domain([0, logArray.length - 1])
            .range([margin, w - margin]);

        const yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([h - margin, margin]);

        const chart = svg.append("g");

        // gradient
        const gradient = chart.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", yScale(0))
            .attr("x2", 0).attr("y2", yScale(maxValue));

        gradient.selectAll("stop")
            .data([
                { offset: "0%", color: "green" },
                { offset: "100%", color: "red" },
            ])
            .enter()
            .append("stop")
            .attr("offset", d => d.offset)
            .attr("stop-color", d => d.color);

        const numericData = logArray.map(LogToNum);

        chart.append("path")
            .datum(numericData)
            .attr("fill", "none")
            .attr("stroke", "url(#line-gradient)")
            .attr("stroke-width", 1.5)
            .attr("d",
                d3.line()
                    .x((d, i) => xScale(i))
                    .y(d => yScale(d))
                    .curve(d3.curveMonotoneX)
            );

    }, [logArray]);

    return (
        <div className="App container text-center mt-3">
            <h6 style={{ color: "white" }}>🎵 Live D3 Music Graph</h6>
            <svg
                id="d3graph"
                width="600"
                height="150"
                className="border border-info rounded"
            ></svg>
        </div>
    );
}
