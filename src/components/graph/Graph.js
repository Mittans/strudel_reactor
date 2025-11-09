import { useState, useEffect } from "react";
import * as d3 from "d3";

export function Graph({className}) {
  function LogToNum(input) {
    if (!input) return 0;
    const parts = input.split(/\s+/);
    for (const part of parts) {
      if (part.startsWith("gain:")) return Number(part.substring(5));
    }
    return 0;
  }

  const [rngNumber, setRngNumber] = useState("");
  const [rngArray, setRngArray] = useState([]);
  const maxItems = 20;
  const intervalTime = 500;

  // Generate random values
  useEffect(() => {
    const interval = setInterval(() => {
      const val = Math.random();
      setRngNumber(`gain:${val}`);
    }, intervalTime);
    return () => clearInterval(interval);
  }, []);

  // Push new value to array
  useEffect(() => {
    setRngArray(prev => {
      const updated = [...prev, rngNumber];
      // Pull the oldest value and push a new one if list is larger than maxItems.
      if (updated.length > maxItems) updated.shift();
      return updated;
    });
  }, [rngNumber]);

  // Draw bar chart
  useEffect(() => {
    if (!rngArray.length) return;

    const svg = d3.select(".graph-svg");

    // Clear previous render
    svg.selectAll("*").remove(); 

    // Get the width and height of the svg.
    const width = svg.node().getBoundingClientRect().width;
    const height = svg.node().getBoundingClientRect().height;
    const margin = { 
      top: 20, 
      right: 20, 
      bottom: 30, 
      left: 40 
    };

    const data = rngArray.map(d => LogToNum(d));

    // Create x Scale
    const xScale = d3.scaleBand()
      .domain(data.map((d, i) => i))
      .range([margin.left, width - margin.right])
      .padding(0.2);

      // Create Y Scale
    const yScale = d3.scaleLinear()
      .domain([0, 2])
      .range([height - margin.bottom, margin.top]);

    // Draw bars for the graph
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => xScale(i))
      .attr("y", d => yScale(d))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin.bottom - yScale(d))
      .attr("fill", "yellow")
      .attr("rx", 5); // rounded top corners

    // Add Y axis
    const yAxis = svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    // Modify Y axis color
    yAxis.selectAll("text").attr("fill", "yellow"); 
    yAxis.selectAll("path,line").attr("stroke", "yellow"); 

  }, [rngArray]);

  return (
    <div className="flex flex-col items-center">
      <svg className={`graph-svg w-full h-72 border border-black rounded bg-white ${className}`}></svg>
    </div>
  );
}
