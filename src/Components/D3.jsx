import { useEffect, useRef } from "react";
import * as d3 from "d3";

function D3Graph() {
    const svgRef = useRef(null);

    // used the drum pattern
    const drumPattern = [1, 0, 1, 0, 1, 1, 0, 1];
    const drumData = drumPattern.map(val => val * 50);

    useEffect(() => {
        const svg = d3.select(svgRef.current);

        const width = 500;
        const height = 200;
        const margin = { top: 10, right: 10, bottom: 25, left: 30 };

        // Clear old content 
        svg.selectAll("*").remove();

        // Main group
        const g = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // Scales
        const xScale = d3.scaleLinear()
            .domain([0, drumData.length - 1])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, 50])
            .range([innerHeight, 0]);

        // Axes
        g.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale));

        g.append("g").call(d3.axisLeft(yScale));

        // Line generator
        const line = d3.line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d));

        // Path
        g.append("path")
            .datum(drumData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

    }, []);

    return (
        <div className="p-3 rounded-3 glass-inner-card mt-4">
            <h5 className="text-center text-light mb-2">D3 Graph</h5>
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default D3Graph;