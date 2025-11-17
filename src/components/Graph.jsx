import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Panel from "./ui/Panel";
import { getD3Data } from "../console-monkey-patch";

export default function Graph() {
  const svgRef = useRef(null);
  const [rngNumber, setRngNumber] = useState(0);
  const [rngArray, setRngArray] = useState([]);
  const maxItems = 20;
  const timeOut = 500;
  const maxValue = 1;

  useEffect(() => {
    const interval = setInterval(() => {
      let d3Data = getD3Data();
      setRngNumber(d3Data);
    }, timeOut);

    return () => clearInterval(interval);
  }, []);

  function LogToNum(input) {
    if (!input) {
      return 0;
    }

    var inputString = String(input);

    var stringArray = inputString.split(/(\s+)/);

    for (const item of stringArray) {
      if (item.startsWith("gain:")) {
        let val = item.substring(5);
        return Number(val);
      }
    }

    return 0;
  }

  useEffect(() => {
    setRngArray((prev) => {
      const temp = [...prev, rngNumber];
      if (temp.length > maxItems) temp.shift();
      return temp;
    });
  }, [rngNumber]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // Set the Width and Height
    let w = svg.node().getBoundingClientRect().width;
    w = w - 40;
    let h = svg.node().getBoundingClientRect().height;
    h = h - 25;
    const barMargin = 10;
    const barWidth = w / rngArray.length;
    let yScale = d3.scaleLinear().domain([0, maxValue]).range([h, 0]);

    let barGroups = svg.selectAll("g").data(rngArray);

    // Add groups
    let newBarGroups = barGroups
      .enter()
      .append("g")
      .attr("transform", (d, i) => {
        return `translate(${i * barWidth}, ${yScale(LogToNum(d))})`;
      });

    newBarGroups
      .append("rect")
      .attr("x", 0)
      .attr("height", (d) => {
        const value = LogToNum(d);
        return h - yScale(value);
      })
      .attr("width", barWidth - barMargin)
      .attr("fill", (d, i) => {
        const value = LogToNum(d);
        return `rgb(${360 - (360 / maxValue) * value + 1}, ${
          (360 / maxValue) * value + 1
        }, 60)`;
      });
  }, [rngArray]);

  return (
    <Panel>
      <div className="row">
        <svg ref={svgRef} width="100%" height="600px"></svg>
      </div>
    </Panel>
  );
}
