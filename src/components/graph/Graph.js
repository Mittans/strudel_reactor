import { useState, useEffect } from "react";
import * as d3 from "d3";


export function Graph() {
    function LogToNum(input) {
        if (!input) { return 0 };

        var stringArray = input.split(/(\s+)/);

        for (const item of stringArray) {
            if (item.startsWith('gain:')) {
                let val = item.substring(5)
                console.log(val + "Hello")
                return Number(val)
            }
        }
        return 0;
    }

    const [rngNumber, setRngNumber] = useState(0);
    const [rngArray, setRngArray] = useState([]);
    const maxItems = 20;
    const timeOut = 500;
    const maxValue = 1;

    useEffect(() => {
        const interval = setInterval(() => {
            let val = 1;
            // setRngNumber(Math.floor(Math.random() * maxValue));
            setRngNumber(`"3/8 -> 7/16: note:d4 s:supersaw cutoff:300 attack:0 decay:0 sustain:0.5 release:0.1
        room:0.6 lpenv:3.3 gain:${val} duration:0.10714285714285714 background-color:black; color:white; border-radius:15px"`)
            return () => clearInterval(interval);
        }, timeOut);
     
    }, []);

    useEffect(() => {

        let tempArray = [...rngArray, rngNumber];
        if (tempArray.length > maxItems) { tempArray.shift() }
        setRngArray(tempArray);
        console.log(rngArray)
    }, [rngNumber]);

    useEffect(() => {
        const svg = d3.select('svg');
        svg.selectAll("*").remove();

        // Determine the size of the SVG element
        let w = svg.node().getBoundingClientRect().width;
        w = w - 40;
        let h = svg.node().getBoundingClientRect().height;
        h = h - 25;

        let barWidth = w / rngArray.length;
        let barMargin = 10;

        // Create Yscale
        let yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([h, 0]);

        // Translate the Bars to make room for axis
        const chartGroup = svg
            .append('g')
            .classed('chartGroup', true)
            .attr('transform', 'translate(30,3)')

        // barGroups = svg.selectAll('g')
        //    .data(rngArray);

        /*let newBarGroups = barGroups.enter()
            .append('g')
            .attr('transform', (d, i) => {
                return `translate(${i * barWidth}, ${yScale(d)})`
            })

        // Impement yScale
        newBarGroups
            .append('rect')
            .attr('height', 0)
            .attr('y', d => h - yScale(d))
            .attr('width', barWidth - barMargin)
            .attr('y', 0)
            .attr('height', d => { return h - yScale(d); })
            .attr('fill', (d,i) => `rbg(${(360 / maxValue * d + 1)},${360 - (360 / maxValue * d + 1)},60)`);
            */
        let yAxis = d3.axisLeft(yScale);

        chartGroup
            .append('path')
            .datum(rngArray.map((d) => LogToNum(d)))
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 1.5)
            .attr('d', d3.line()
                .x((d, i) => i * barWidth)
                .y((d) => yScale(d))
        )
        chartGroup
            .append('g')
            .classed('axis y', true)
            .call(yAxis);
    }, [rngArray])
    return (
        <div className="App container">

            <h1>
                RNG Output: { rngNumber}
            </h1>
            <div className="grid-rows-3">
                <svg className="w-full h-600 border border-black rounded p-2 bg-white"></svg>
            </div>
        </div>
    );

}