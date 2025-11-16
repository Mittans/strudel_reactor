import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function VolumeSlider({ onVolumeChange }) {
  const svgRef = useRef(null);
  const [volume, setVolume] = useState(0.7);
  const [volumeHistory, setVolumeHistory] = useState([]);
  const maxBars = 30; // max bars shown

  // Notify parent component when volume changes
  useEffect(() => {
    if (onVolumeChange) onVolumeChange(volume);
  }, [volume, onVolumeChange]);

  // Add new volume value to history
  useEffect(() => {
    setVolumeHistory((prev) => {
      const newData = [...prev, volume];
      if (newData.length > maxBars) newData.shift();
      return newData;
    });
  }, [volume]);

  // Draw slider and bar graph
  useEffect(() => {
    if (!svgRef.current) return;

    const width = 575;
    const height = 200;
    const sliderY = 160;
    const barHeight = 6;
    const barAreaHeight = 100;
    const marginLeft = 50; // space for y-axis

    // Clear SVG before redrawing
    d3.select(svgRef.current).selectAll('*').remove();

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .style('background', 'white');

    // X scale for slider
    const xScale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, width]);

    // ---- Bar Graph ----
    const barWidth = (width - marginLeft) / maxBars;
    const yScale = d3.scaleLinear()
      .domain([0, 1])
      .range([barAreaHeight, 0]);

    // Bars for volume history
    svg.selectAll('rect.bar')
      .data(volumeHistory)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d, i) => marginLeft + i * barWidth)
      .attr('y', d => yScale(d))
      .attr('width', barWidth - 2)
      .attr('height', d => barAreaHeight - yScale(d))
      .attr('fill', 'blue');

    // Y-axis for the bar graph
    const yAxis = d3.axisLeft(yScale)
      .ticks(5)
      .tickFormat(d3.format('.1f'));

    svg.append('g')
      .attr('transform', `translate(${marginLeft - 10},20)`)
      .call(yAxis)
      .attr('color', 'black');

    // ---- Slider ----
    // Grey background
    svg.append('rect')
      .attr('x', 0)
      .attr('y', sliderY)
      .attr('width', width)
      .attr('height', barHeight)
      .attr('rx', 4)
      .attr('fill', 'grey');

    // Blue filled portion
    const filledTrack = svg.append('rect')
      .attr('x', 0)
      .attr('y', sliderY)
      .attr('width', xScale(volume))
      .attr('height', barHeight)
      .attr('rx', 4)
      .attr('fill', 'blue');

    // Circle handle
    const handle = svg.append('circle')
      .attr('cx', xScale(volume))
      .attr('cy', sliderY + barHeight / 2)
      .attr('r', 10)
      .attr('fill', 'white')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('cursor', 'pointer');

    // Drag behavior
    const drag = d3.drag().on('drag', (event) => {
      let x = event.x;
      if (x < 0) x = 0;
      if (x > width) x = width;
      const newVolume = parseFloat(xScale.invert(x).toFixed(2));
      setVolume(newVolume);
    });
    handle.call(drag);

    // Click to change volume
    svg.on('click', (event) => {
      const [x] = d3.pointer(event);
      if (x < 0 || x > width) return;
      const newVolume = parseFloat(xScale.invert(x).toFixed(2));
      setVolume(newVolume);
    });

  }, [volume, volumeHistory]);

  return (
    <div>
      <div style={{ marginBottom: '10px', fontSize: '18px' }}>
        Volume: {Math.round(volume * 100)}%
      </div>
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default VolumeSlider;
