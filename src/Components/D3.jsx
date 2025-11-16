import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { stranger_tune } from "../Storage/tunes";


const DRUM_DATA = [0, 4, 6];

function D3Graph({ data = DRUM_DATA }) {
    const svgRef = useRef(null);

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
            .domain([0, data.length - 1])
            .range([0, innerWidth]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([innerHeight, 0]);

        // Axes
        g.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(d3.axisBottom(xScale).ticks(data.length));

        g.append("g").call(d3.axisLeft(yScale));

        // Line generator
        const line = d3.line()
            .x((d, i) => xScale(i))
            .y((d) => yScale(d))
            .curve(d3.curveMonotoneX);

        // Path
        g.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

    }, [data]);

    return (
        <div className="p-3 rounded-3 glass-inner-card mt-4">
            <h5 className="text-center text-light mb-2">D3 Graph</h5>
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default D3Graph;
