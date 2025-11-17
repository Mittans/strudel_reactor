import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import console_monkey_patch from "../console-monkey-patch";

function D3Graph() {
    const svgRef = useRef(null);

    // this will hold the live Strudel data
    const [drumData, setDrumData] = useState([]);

    // Listen for live data from Strudel
    useEffect(() => {
        console_monkey_patch();

        const handleD3Data = (event) => {
            // this is what the tutor showed us to use
            console.log("d3Data event detail:", event.detail);

            const rawArray = event.detail;

            // turn event.detail values into numbers 
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

    // Draw and update the graph when data changes
    useEffect(() => {
        if (!svgRef.current || drumData.length === 0) return;

        const width = 500;
        const height = 200;
        const margin = { top: 10, right: 10, bottom: 40, left: 45 };

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const g = svg
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        // X = event index (0, 1, 2, 3, ...)
        const xScale = d3.scaleLinear()
            .domain([0, drumData.length - 1])
            .range([0, innerWidth]);

        // Y = numeric value from Strudel messages
        const maxY = d3.max(drumData) || 1;
        const yScale = d3.scaleLinear()
            .domain([0, maxY])
            .range([innerHeight, 0]);

        // X axis
        const xAxis = d3.axisBottom(xScale).ticks(5);
        g.append("g")
            .attr("transform", `translate(0, ${innerHeight})`)
            .call(xAxis)
            .selectAll("text")
            .style("font-size", "10px");

        // Y axis
        const yAxis = d3.axisLeft(yScale).ticks(5);
        const yAxisGroup = g.append("g").call(yAxis);
        yAxisGroup.selectAll("text").style("font-size", "10px");

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


        g.append("text")
            .attr("x", innerWidth / 2)
            .attr("y", innerHeight + 30)
            .attr("text-anchor", "middle")
            .style("font-size", "11px")
            .style("fill", "#ffffff")
            .text("Event Index");

        g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("x", -innerHeight / 2)
            .attr("y", -35)
            .attr("text-anchor", "middle")
            .style("font-size", "11px")
            .style("fill", "#ffffff")
            .text("Value from Strudel");

    }, [drumData]);

    return (
        <div className="p-3 rounded-3 glass-inner-card mt-4">
            <h5 className="text-center text-light mb-2">Live Strudel Data (Line Graph)</h5>
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default D3Graph;
