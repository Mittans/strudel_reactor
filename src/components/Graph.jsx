import { useEffect } from "react";
import * as d3 from "d3";

// Changes a value for the log provided by strudel to a number.
// In this case it changes the gain from log to number.
function LogToNum(input) {
    if (!input) {
        return 0;
    }
    var stringArray = input.split(/(\s+)/);

    for (const item of stringArray) {
        if (item.startsWith("gain:")) {
            let val = item.substring(5);
            return Number(val);
        }
    }
    return 0;
}

export default function Graph({ rngArray }) {
    // Sets the maximum value that is displayed on the y axis.
    const maxValue = 1.5;

    useEffect(() => {
        // create a graph
        const svg = d3.select("svg");
        svg.selectAll("*").remove();

        // Sets the width and height of the graph
        let w = svg.node().getBoundingClientRect().width;
        w = w - 40;
        let h = svg.node().getBoundingClientRect().height;
        h = h - 25;

        // sets the width of the bar
        const barWidth = w / rngArray.length;

        // sets the y axis maximum
        let yScale = d3.scaleLinear().domain([0, maxValue]).range([h, 0]);

        // Creates a place for the chart to be displayed
        const chartGroup = svg
            .append("g")
            .classed("chartGroup", true)
            .attr("transform", "translate(30, 3)");

        // Formats the data displayed
        chartGroup
            .append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("y1", yScale(0))
            .attr("x2", 0)
            .attr("y2", yScale(maxValue))
            .selectAll("stop")
            .data([
                { offset: "0%", color: "green" },
                { offset: "100%", color: "red" },
            ])
            .enter()
            .append("stop")
            .attr("offset", function (d) {
                return d.offset;
            })
            .attr("stop-color", function (d) {
                return d.color;
            });

        // Sets the data displayed in the graph
        // Sets the data to be displayed as a line
        chartGroup
            .append("path")
            .datum(rngArray.map((d) => LogToNum(d)))
            .attr("fill", "none")
            .attr("stroke", "url(#line-gradient)")
            .attr("stroke-width", 1.5)
            .attr(
                "d",
                d3
                    .line()
                    .x((d, i) => i * barWidth)
                    .y((d) => yScale(d))
            );

        // Creates the y axis
        let yAxis = d3.axisLeft(yScale);
        chartGroup.append("g").classed("axis y", true).call(yAxis);
    }, [rngArray]);

    // Displays graph
    return (
        <div className="row mt-2">
            <svg width="100%" height="400px"></svg>
        </div>
    );
}
