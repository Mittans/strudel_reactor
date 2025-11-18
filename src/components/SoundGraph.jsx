import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";
import { getD3Data } from "../console-monkey-patch";
import "./SoundGraph.css";

// This is the most extensive features of all and it is responsible for making the d3 graph for all the
// instruments gain and make things more DJiesh and cool on the webpage. It uses a SVG tag which we work on
// using the D3 library and create a beautiful looking graph. We take the data using .log() from the strudel code.
// We then process that data using the console-monkey-patch, then use that to make a beautiful sound graph.
// It only runs when the song is playing by taking the isPlaying property from the app.js file.
function SoundGraph({ isPlaying }) {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const [rngArray, setRngArray] = useState([]);

    const maxItems = 50;
    const timeOut = 400;
    const maxValue = 1;

    // Refered from the practicals 
    useEffect(() => {
        if (!isPlaying) return;
        const interval = setInterval(() => {
            const arr = getD3Data();
            if (arr && arr.length > 0) {
                setRngArray([...arr.slice(-maxItems)]);
            }
        }, timeOut);
        return () => clearInterval(interval);
    }, [isPlaying]);

    // Refered from the practicals
    function LogToNum(input) {
        if (!input) return 0;
        var stringArray = input.split(/(\s+)/);
        for (const item of stringArray) {
            if (item.startsWith("gain:")) {
                let val = item.substring(5);
                return Number(val);
            }
        }
        return 0;
    }

    // This useeffect is used to make the d3 everytime it trigger by change the RNGArray with is technically 
    // coming from the processing we are doing with the log data from strudel. 
    useEffect(() => {
        if (!svgRef.current || rngArray.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const containerWidth = wrapperRef.current.clientWidth;
        const width = containerWidth;
        const height = 150;
        const margin = 40;

        // creating the X-scale
        const xScale = d3.scaleLinear()
            .domain([0, rngArray.length - 1])
            .range([margin, width - margin]);

        // creating the Y-scale
        const yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([height - margin, margin]);

        // creating a grid to make it look clean
        const yGrid = d3.axisLeft(yScale)
            .ticks(5)
            .tickSize(-width + margin * 2)
            .tickFormat("");

        svg.append("g")
            .attr("class", "y-grid")
            .attr("transform", `translate(${margin},0)`)
            .call(yGrid);

        // have done bunch of styling by refering to a lot d3 documentation and some debugging using AI with full understanding
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("x1", "0%")
            .attr("x2", "100%")
            .attr("y1", "0%")
            .attr("y2", "0%");

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "lime");

        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "magenta");

        const values = rngArray.map(d => LogToNum(d));

        const lineGen = d3.line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d))
            .curve(d3.curveCatmullRom.alpha(0.4));

        svg.append("path")
            .datum(values)
            .attr("class", "sound-line")
            .attr("d", lineGen);

        svg.append("g")
            .attr("class", "y-axis")
            .attr("transform", `translate(${margin},0)`)
            .call(d3.axisLeft(yScale).ticks(5));
    }, [rngArray]);

    return (
        <div ref={wrapperRef} className="soundgraph-container">
            <h5 className="soundgraph-title">Sound Graph</h5>
            <svg ref={svgRef} className="soundgraph-svg"></svg>
        </div>
    );
}

export default SoundGraph;
