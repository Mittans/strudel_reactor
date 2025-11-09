import { useEffect } from "react";
import * as d3 from "d3";

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
    const maxValue = 1;

    useEffect(() => {
        const svg = d3.select("svg");
        svg.selectAll("*").remove();

        let w = svg.node().getBoundingClientRect().width;
        w = w - 40;
        let h = svg.node().getBoundingClientRect().height;
        h = h - 25;
        const barWidth = w / rngArray.length;

        let yScale = d3.scaleLinear().domain([0, maxValue]).range([h, 0]);

        const chartGroup = svg
            .append("g")
            .classed("chartGroup", true)
            .attr("transform", "translate(30, 3)");

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

        let yAxis = d3.axisLeft(yScale);
        chartGroup.append("g").classed("axis y", true).call(yAxis);
    }, [rngArray]);

    return (
        <div className="row mt-2">
            <svg width="100%" height="400px"></svg>
        </div>
    );
}
