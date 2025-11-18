import { useEffect, useRef } from "react";
import * as d3 from "d3";

// ID used inside tunes.js analyze("d3scope")
const ANALYSER_KEY = "d3scope";  

export default function D3Graph() {
    const svgElementRef = useRef(null);

    useEffect(() => {
        if (!svgElementRef.current) return;

        const svg = d3.select(svgElementRef.current);

        // Clear previous render
        svg.selectAll("*").remove();

        // Layout and dimensions
        const rect = svgElementRef.current.getBoundingClientRect();
        const fullWidth = rect.width || 600;
        const fullHeight = rect.height || 200;

        const margin = { top: 4, right: 4, bottom: 4, left: 4 };
        const width = fullWidth - margin.left - margin.right;
        const height = fullHeight - margin.top - margin.bottom;

        // Main group container
        const mainGroup = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Background
        mainGroup
            .append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("fill", "black");

        // Gradient green to red
        const gradient = svg
            .append("defs")
            .append("linearGradient")
            .attr("id", "waveform-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0)
            .attr("x2", 0)
            .attr("y1", 0)
            .attr("y2", height);

        // Base stops for the gradient, diff colors
        const gradientBaseStops = [
            { offset: "0%", color: "#FF0033" },   // top  red
            { offset: "100%", color: "#00FF44" },  // bottom green
        ];

        gradient
            .selectAll("stop")
            .data(gradientBaseStops)
            .enter()
            .append("stop")
            .attr("offset", d => d.offset)
            .attr("stop-color", d => d.color);

        // Path for waveform rendering
        const waveformPath = mainGroup
            .append("path")
            .attr("fill", "none")
            .attr("stroke", "url(#waveform-gradient)")
            .attr("stroke-width", 2);

        // Real time draw graph
        let frameId;

        const drawFrame = () => {
            const analyserMap = window.analysers;
            const analyserNode =
                analyserMap && analyserMap[ANALYSER_KEY]
                    ? analyserMap[ANALYSER_KEY]
                    : null;

            if (!analyserNode) {
                // analyser is not ready
                frameId = requestAnimationFrame(drawFrame);
                return;
            }

            const bufferSize = analyserNode.fftSize;
            const byteBuffer = new Uint8Array(bufferSize);
            analyserNode.getByteTimeDomainData(byteBuffer);

            // Convert bytes 0¨C255 to waveform range -1 to 1
            const waveformSamples = Array.from(byteBuffer, b => (b - 128) / 128);

            // Compute peak amplitude for coloring
            const peakAmplitude = Math.max(...waveformSamples.map(v => Math.abs(v)));

            // Increase redness when the signal is loud
            const redIntensity = d3.scaleLinear().domain([0, 1]).range([0, 0.5])(peakAmplitude);

            // Update gradient color dynamically
            gradient.selectAll("stop").attr("stop-color", (d, i) => {
                const baseColor = d3.color(gradientBaseStops[i].color);
                const boosted = baseColor.copy();

                // boost red channel based on amplitude
                boosted.r = Math.min(255, baseColor.r + redIntensity * 255);

                return boosted.formatHex();
            });

            // X,Y scales
            const xScale = d3.scaleLinear().domain([0, waveformSamples.length - 1]).range([0, width]);
            const yScale = d3.scaleLinear().domain([-1, 1]).range([height, 0]);

            // D3 line generator
            const lineGenerator = d3
                .line()
                .x((d, i) => xScale(i))
                .y(d => yScale(d))
                .curve(d3.curveLinear);

            // Draw waveform
            waveformPath.attr("d", lineGenerator(waveformSamples));

            frameId = requestAnimationFrame(drawFrame);
        };

        // Start animation loop
        frameId = requestAnimationFrame(drawFrame);

        // Cleanup at the end
        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <div className="d3-panel">
            <h5 className="d3-title">Waveform Scope</h5>
            <svg ref={svgElementRef} width="100%" height="200"></svg>
        </div>
    );
}
