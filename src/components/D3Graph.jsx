import { useState, useEffect, useRef } from 'react';
import * as d3 from "d3";
import { subscribe, unsubscribe, getD3Data } from "../console-monkey-patch";

// Get "gain:value" from hap log string
function logToGain(input) {
    if (!input) return 0;

    const tokens = input.split(/(\s+)/);
    for (const token of tokens) {
        if (token.startsWith("gain:")) {
            const raw = token.substring(5);
            const parsed = Number(raw);
            return Number.isFinite(parsed) ? parsed : 0;
        }
    }
    return 0;
}

export default function D3Graph() {
    // Holds recent gain values for live scope visualization
    const [gainHistory, setGainHistory] = useState([]);
    // Reference to the SVG element where D3 draws the graph
    const scopeSvgRef = useRef(null);

    // number of points in scope window
    const maxItems = 80;   
    // expected max gain
    const maxValue = 1;    

    // Subscribe to Strudel hap logs via CustomEvent
    useEffect(() => {
        const handleD3Data = (event) => {
            const logs = event.detail;
            const gains = logs.map(logToGain);
            // keep last maxItems
            const recentGains = gains.slice(-maxItems);
            setGainHistory(recentGains);
        };

        // Initial snapshot
        const initialLogs = getD3Data();
        if (initialLogs.length > 0) {
            const gains = initialLogs.map(logToGain);
            setGainHistory(gains.slice(-maxItems));
        }

        subscribe("d3Data", handleD3Data);
        return () => unsubscribe("d3Data", handleD3Data);
    }, []);

    // Draw the D3 scope line when udate
    useEffect(() => {
        if (!scopeSvgRef.current || gainHistory.length === 0) return;

        const svg = d3.select(scopeSvgRef.current);
        svg.selectAll("*").remove();
        svg.append("rect")
            .attr("width", "100%")
            .attr("height", "100%")
            .attr("fill", "black");

        const bounds = scopeSvgRef.current.getBoundingClientRect();
        let w = bounds.width - 40;
        let h = bounds.height - 25;

        const yScale = d3
            .scaleLinear()
            .domain([0, maxValue])
            .range([h, 0]);

        const chartGroup = svg
            .append("g")
            .attr("transform", "translate(30,3)");

        const xScale = d3
            .scaleLinear()
            .domain([0, gainHistory.length - 1])
            .range([0, w]);

        // lineargradient green to read
        chartGroup
            .append("linearGradient")
            .attr("id", "scope-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", yScale(0))
            .attr("x2", 0)
            .attr("y2", yScale(maxValue))
            .selectAll("stop")
            .data([
                { offset: "0%", color: "lime" },
                { offset: "100%", color: "red" },
            ])
            .enter()
            .append("stop")
            .attr("offset", (d) => d.offset)
            .attr("stop-color", (d) => d.color);

        const line = d3
            .line()
            .x((d, i) => xScale(i))
            .y((d) => yScale(d))
            .curve(d3.curveMonotoneX);

        chartGroup
            .append("path")
            .datum(gainHistory)
            .attr("fill", "none")
            .attr("stroke", "url(#scope-gradient)")
            .attr("stroke-width", 1.5)
            .attr("d", line);

    }, [gainHistory]);

    return (
        <div className="d3-panel">
            <h5 className="d3-title">Drums Gain</h5>
            <svg ref={scopeSvgRef} width="100%" height="200"></svg>
        </div>
    );
}
