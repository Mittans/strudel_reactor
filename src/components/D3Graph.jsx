import { useState, useEffect } from 'react';
import * as d3 from 'd3';

// For clarity that class was made using code from week 12 d3 examples :)

function LogToNum(input) {
    if (!input) {
        return 0;
    }

    const match = input.match(/gain:([\d.]+)/);
    return match ? parseFloat(match[1]) : 0;

}

export default function D3Graph() {

    const [rngArray, setRngArray] = useState([]);
    const maxItems = 50;

    useEffect(() => {

        const handleD3Data = (event) => {

            const value = LogToNum(event.detail);
            setRngArray(prev => {
                const newArray = [...prev, value];
                if (newArray.length > maxItems) {
                    newArray.shift();
                }
                return newArray;
            });
        };

        document.addEventListener("d3Data", handleD3Data);
        return () => {
            document.removeEventListener("d3Data", handleD3Data);
        }
    }, []);

    // Rendering the D3 Graph
    useEffect(() => {
        const svg = d3.select('svg');
        svg.selectAll("*").remove();

        const w = svg.node().getBoundingClientRect().width - 40;
        const h = svg.node().getBoundingClientRect().height - 25;
        const barWidth = w / (rngArray.length || 1);

        const yScale = d3.scaleLinear()
            .domain([0, 10])
            .range([h, 0]);

        const chartGroup = svg.append('g')
            .attr('transform', 'translate(30,3)');
        
        chartGroup.append('path')
        .datum(rngArray)
        .attr('fill', 'none')
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2)
        .attr('d', d3.line()
            .x((d, i) => i * barWidth)
            .y(d => yScale(d))
        );
    
        const yAxis = d3.axisLeft(yScale);
        chartGroup.append('g')
        .call(yAxis);
    }, [rngArray]);

    return (
        <div>
            <h5 style={{ color: 'white' }}>Live Strudel Gain Visualisation</h5>
            <svg width="100%" height="500px" className="border rounded p-2"></svg>
        </div>
    );
}