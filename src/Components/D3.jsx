import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import console_monkey_patch from "../console-monkey-patch";

function D3Graph() {
    const svgRef = useRef(null);

    const [drumData, setDrumData] = useState([]);

    // Listen for live data from Strudel
    useEffect(() => {
        console_monkey_patch();

        const handleD3Data = (event) => {
            console.log("d3Data event detail:", event.detail);

            const rawArray = event.detail;

            const numericData = rawArray
                .map(v => parseFloat(String(v).split(" ")[0]))
                .filter(v => !Number.isNaN(v));

            setDrumData(numericData);
        };

        document.addEventListener("d3Data", handleD3Data);

        return () => {
            document.removeEventListener("d3Data", handleD3Data);
        };
    }, []);

    // Draw and update the graph
    useEffect(() => {
        if (!svgRef.current || drumData.length === 0) return;

        const width = 550;
        const height = 250;
        const margin = { top: 15, right: 30, bottom: 45, left: 50 };

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const g = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // x-scale
        const xScale = d3.scaleLinear()
            .domain([0, drumData.length - 1])
            .range([0, innerWidth]);

        // y-scale
        const maxY = d3.max(drumData) || 1;
        const yScale = d3.scaleLinear()
            .domain([0, maxY])
            .range([innerHeight, 0]);

        // X Axis
        const xAxis = d3.axisBottom(xScale).ticks(5);
        const xAxisGroup = g.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(xAxis);

        xAxisGroup.selectAll("text")
            .style("font-size", "11px")
            .style("fill", "#f8f9fa");

        xAxisGroup.selectAll("path, line")
            .style("stroke", "steelblue")
            .style("stroke-width", "1.5");

        // Y Axis
        const yAxis = d3.axisLeft(yScale).ticks(5);
        const yAxisGroup = g.append("g").call(yAxis);

        yAxisGroup.selectAll("text")
            .style("font-size", "11px")
            .style("fill", "#f8f9fa");

        yAxisGroup.selectAll("path, line")
            .style("stroke", "steelblue")
            .style("stroke-width", "1.5");

        // Line shape
        const line = d3.line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d))
            .curve(d3.curveBasis);

        g.append("path")
            .datum(drumData)
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("d", line);

        // X axis label
        g.append("text")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + 35)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "#f8f9fa")
            .text("Event Index");

        // Y axis label
        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -40)
            .attr("text-anchor", "middle")
            .style("font-size", "12px")
            .style("fill", "#f8f9fa")
            .text("Value from Strudel");

    }, [drumData]);

    return (
        <div className="p-4 rounded-4 glass-card mb-3">
            <h5 className="text-center text-light mb-3">  Live Strudel Data (Line Graph)</h5>
            <svg ref={svgRef}></svg>
        </div>
    );
}



export default D3Graph;
