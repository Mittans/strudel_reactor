import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { getD3Data } from "../console-monkey-patch";


function logToGain(line) {
    if (!line) return null;

    const gainMatch = line.match(/gain[^0-9]*([0-9]*\.?[0-9]+)/i);
    if (gainMatch) {
        const v = parseFloat(gainMatch[1]);
        if (!Number.isNaN(v)) return v;
    }

    const nums = line.match(/([0-9]*\.?[0-9]+)/g);
    if (nums && nums.length > 0) {
        const v = parseFloat(nums[nums.length - 1]);
        if (!Number.isNaN(v)) return v;
    }

    return null;
}
function StrudelGraph() {
    const svgRef = useRef(null);
    const [gainArray, setGainArray] = useState([]);

    useEffect(() => {
        const maxItems = 80;      
        const intervalMs = 300;   

        const id = setInterval(() => {
            const data = getD3Data(); 

            if (Array.isArray(data) && data.length > 0) {
                const numeric = data
                    .map(logToGain)
                    .filter((v) => v != null);

                if (numeric.length > 0) {
                  
                    const trimmed = numeric.slice(-maxItems);
                    setGainArray(trimmed);
                }
            }
        }, intervalMs);

        return () => clearInterval(id);
    }, []);

  
    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); 

        if (gainArray.length === 0) {
            return;
        }

     
        const width = 360;
        const height = 180;
        const margin = { top: 15, right: 10, bottom: 25, left: 40 };

        svg.attr("viewBox", `0 0 ${width} ${height}`);

        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;

        const maxValue = 1;

        const xScale = d3
            .scaleLinear()
            .domain([0, gainArray.length - 1])
            .range([0, innerWidth]);

        const yScale = d3
            .scaleLinear()
            .domain([0, maxValue])
            .range([innerHeight, 0]);

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        g.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", innerWidth)
            .attr("height", innerHeight)
            .attr("rx", 8)
            .attr("ry", 8)
            .attr("fill", "#10131b");

      
        const yAxis = d3.axisLeft(yScale).ticks(4);
        g.append("g")
            .attr("color", "#555")
            .call(yAxis)
            .selectAll("text")
            .attr("fill", "#aaa")
            .attr("font-size", "10px");

   
        const xAxis = d3.axisBottom(xScale)
            .ticks(4)
            .tickFormat(() => "");
        g.append("g")
            .attr("transform", `translate(0,${innerHeight})`)
            .attr("color", "#444")
            .call(xAxis);

        g.append("g")
            .attr("class", "grid")
            .selectAll("line")
            .data(yScale.ticks(4))
            .enter()
            .append("line")
            .attr("x1", 0)
            .attr("x2", innerWidth)
            .attr("y1", (d) => yScale(d))
            .attr("y2", (d) => yScale(d))
            .attr("stroke", "#1f2430")
            .attr("stroke-width", 1)
            .attr("stroke-dasharray", "2,3");

        const defs = svg.append("defs");
        const gradient = defs
            .append("linearGradient")
            .attr("id", "gainGradient")
            .attr("x1", "0%")
            .attr("x2", "0%")
            .attr("y1", "100%")
            .attr("y2", "0%");

        gradient
            .append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "#ff4b4b");

        gradient
            .append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "#1db954"); 

      
        const area = d3
            .area()
            .x((d, i) => xScale(i))
            .y0(innerHeight)
            .y1((d) => yScale(d));

        g.append("path")
            .datum(gainArray)
            .attr("fill", "url(#gainGradient)")
            .attr("opacity", 0.25)
            .attr("d", area);

   
        const line = d3
            .line()
            .x((d, i) => xScale(i))
            .y((d) => yScale(d));

        g.append("path")
            .datum(gainArray)
            .attr("fill", "none")
            .attr("stroke", "url(#gainGradient)")
            .attr("stroke-width", 2)
            .attr("d", line);

        const lastIndex = gainArray.length - 1;
        const lastValue = gainArray[lastIndex];

        g.append("circle")
            .attr("cx", xScale(lastIndex))
            .attr("cy", yScale(lastValue))
            .attr("r", 4)
            .attr("fill", "#ffffff")
            .attr("stroke", "#1db954")
            .attr("stroke-width", 1.5);

        g.append("text")
            .attr("x", 4)
            .attr("y", 12)
            .attr("fill", "#ccc")
            .attr("font-size", "11px")
            .text("Gain (last logs)");

        g.append("text")
            .attr("x", innerWidth - 4)
            .attr("y", innerHeight - 4)
            .attr("fill", "#8a8f9d")
            .attr("font-size", "10px")
            .attr("text-anchor", "end")
            .text(lastValue.toFixed(2));
    }, [gainArray]);

    return (
        <div className="mt-3">
            <h6 style={{ fontSize: "0.9rem" }}>D3 Live Gain Graph</h6>
            <svg ref={svgRef} style={{ width: "100%", height: "180px" }} />
        </div>
    );
}

export default StrudelGraph;
