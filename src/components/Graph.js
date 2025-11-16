import * as d3 from "d3";
import { useEffect, useState } from "react";
import { getD3Data } from "../console-monkey-patch";

export default function Graph() {

    const [logArray, setLogArray] = useState([]);
    const maxItems = 50;
    const maxValue = 1.0;
    const updateInterval = 400;

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

    useEffect(() => {
        const timer = setInterval(() => {
            const data = getD3Data();
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

    useEffect(() => {
        const svg = d3.select("#d3graph");
        svg.selectAll("*").remove();

        const w = 600, h = 150, margin = 20;

        const xScale = d3.scaleLinear()
            .domain([0, logArray.length - 1])
            .range([margin + 30, w - margin]);

        const yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([h - margin, margin]);

        const chart = svg.append("g");

        // --- Background BOX ---
        chart.append("rect")
            .attr("x", 10)
            .attr("y", 5)
            .attr("width", w - 20)
            .attr("height", h - 10)
            .attr("rx", 15)
            .attr("ry", 15)
            .attr("fill", "rgba(0,0,0,0.55)")     
            .attr("stroke", "#ff3b3b")            
            .attr("stroke-width", 2.5)
            .style("filter", "drop-shadow(0 0 8px #ff3b3b)");
            

        // --- Y-AXIS ---
        const yAxis = d3.axisLeft(yScale)
            .ticks(5)
            .tickSize(3)
            .tickFormat(d3.format(".1f"));

        chart.append("g")
            .attr("transform", `translate(${margin + 30},0)`)
            .call(yAxis)
            .call(g => g.selectAll("text").attr("fill", "#00ffc8"))
            .call(g => g.selectAll("line").attr("stroke", "#00ffc8"))
            .call(g => g.selectAll(".domain").attr("stroke", "#00ffc8"));

        // --- Line colour (NEON CYAN) ---
        const numericData = logArray.map(LogToNum);

        chart.append("path")
            .datum(numericData)
            .attr("fill", "none")
            .attr("stroke", "#ff3b3b")                  
            .style("filter", "drop-shadow(0 0 8px #ff4f4f)")             
            .attr("stroke-width", 2.5)
            .style("filter", "drop-shadow(0 0 6px #00ffe1)")
            .attr("d",
                d3.line()
                    .x((d, i) => xScale(i))
                    .y(d => yScale(d))
                    .curve(d3.curveMonotoneX)
            );

    }, [logArray]);

    return (
        <div className="App container text-center mt-3">
            <h6 id="graphTitle">Midnight in Motion – Live Gain Visualizer</h6>
            <svg
                id="d3graph"
                width="600"
                height="150"
            ></svg>
        </div>
    );
}
