import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function D3Graph({
  title = "Volume Level",
  height = 240,
  //yDomain range
  yDomain = [0, 1],
  //how many data points to keep in history
  maxItems = 60
}) {
 
  const svgRef = useRef(null);

  //latest single value 
  const [currentValue, setCurrentValue] = useState(0);

  //array of recent values to draw as a line
  const [values, setValues] = useState([]);

  //listen for "d3Data" events from the app
  useEffect(() => {
    const handler = (e) => {
    
      let raw = e.detail;


      if (typeof raw === "object" && raw !== null) {
        raw = raw.value ?? raw.level ?? 0;
      }

      //make sure it's a number
      let v = Number(raw);
      if (Number.isNaN(v)) v = 0;

    
      const [yMin, yMax] = yDomain;
      if (yMax > yMin) {
        v = Math.max(yMin, Math.min(yMax, v));
      }

      //upd the curr value shown in title
      setCurrentValue(v);

      //add value to the history array
      setValues((prev) => {
        const next = [...prev, v];
        //if we have more than maxItems then remove the oldest one
        if (next.length > maxItems) next.shift();
        return next;
      });
    };

    //listen globally on window
    window.addEventListener("d3Data", handler);


    return () => {
      window.removeEventListener("d3Data", handler);
    };
  }, [yDomain, maxItems]);

  //updt the D3 chart whenever the values array changes
  useEffect(() => {
    const svgEl = svgRef.current;
    if (!svgEl) return;

    //select the SVG with D3
    const svg = d3.select(svgEl);

    //clear everything that was drawn before
    svg.selectAll("*").remove();

    const margin = { top: 10, right: 10, bottom: 10, left: 40 };

    //width of the SVG element
    const width = svgEl.clientWidth;

    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

  
    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const [yMin, yMax] = yDomain;

    //yscale: maps value 
    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax])      // data range
      .range([innerHeight, 0]);  // pixel range (0 at top)

    //xscale: maps index
    const xScale = d3
      .scaleLinear()
      .domain([0, Math.max(values.length - 1, 1)]) // indexes 0..N-1
      .range([0, innerWidth]);

    
    const yAxis = d3.axisLeft(yScale).ticks(5);
    g.append("g").classed("axis y", true).call(yAxis);

    //defines a vertical gradient (green at bottom, red at top)
    const defs = svg.append("defs");
    const gradient = defs
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", yScale(yMin))
      .attr("x2", 0)
      .attr("y2", yScale(yMax));

    gradient
      .selectAll("stop")
      .data([
        { offset: "0%", color: "green" }, // bottom
        { offset: "100%", color: "red" }, // top
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    //line gen
    const line = d3
      .line()
     
      .x((d, i) => xScale(i))
     
      .y((d) => yScale(d));


    g.append("path")
      .datum(values) //gives the entire values array to the line gen
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)") 
      .attr("stroke-width", 2)
      .attr("d", line); 
  }, [values, yDomain, height]);

  return (
    <div className="App container mb-3">
      {/* Title + current numeric value */}
      {title && (
        <h2 className="h5">
          {title}: {currentValue.toFixed(2)}
        </h2>
      )}
      <div className="row">
       {/* svg where D3 will draw the graph */}
        <svg
          ref={svgRef}
          width="100%"
          height={height}
          className="border border-primary rounded p-2"
        />
      </div>
    </div>
  );
}
