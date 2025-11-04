import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function VolumeSlider() {
  const svgRef = useRef(null); // Reference to SVG element
  const [volume, setVolume] = useState(70);

  // Runs when volume slider / component render
  useEffect(() => {
    if (!svgRef.current) return;

    // Slider dimensions
    const width = 575;
    const height = 30;
    const barHeight = 6;

    // Clears previous element before redrawing
    d3.select(svgRef.current).selectAll('*').remove();

    // Select SVG element and set size
    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Creates scale to map volume 0 - 100 with pixels 0 - width
    const scale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    // Slider background
    svg.append('rect')
      .attr('y', height / 2 - barHeight / 2)
      .attr('width', width)
      .attr('height', barHeight)
      .attr('rx', 4)
      .attr('fill', 'grey');

    // Filled slider portion
    const filledTrack = svg.append('rect')
      .attr('y', height / 2 - barHeight / 2)
      .attr('width', scale(volume))
      .attr('height', barHeight)
      .attr('rx', 4)
      .attr('fill', 'blue');

    // Circle handle
    const handle = svg.append('circle')
      .attr('cx', scale(volume))
      .attr('cy', height / 2)
      .attr('r', 10)
      .attr('fill', '#fff')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('cursor', 'pointer');

    // Drag
    const drag = d3.drag()
      .on('drag', (event) => {
        let x = event.x;
        if (x < 0) x = 0;
        if (x > width) x = width;
        const newVolume = Math.round(scale.invert(x));
        setVolume(newVolume);
      });

    handle.call(drag);

    // Updates volume when user clicks on slider
    svg.on('click', (event) => {
      const x = d3.pointer(event)[0];
      const newVolume = Math.round(scale.invert(x));
      setVolume(newVolume);
    });

  }, [volume]); // Runs effect when volume changes

  return (
    <div>
      {/* Display current volume value */}
      <div style={{ marginTop: '10px', fontSize: '18px' }}>
        Volume: {volume}%
      </div>
      {/* SVG AREA */}
      <svg ref={svgRef}></svg>
    </div>
  );
}

export default VolumeSlider;