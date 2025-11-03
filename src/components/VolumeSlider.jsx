import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function VolumeSlider() {
  const svgRef = useRef(null);
  const [volume, setVolume] = useState(70);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 300;
    const height = 30;
    const barHeight = 6;

    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const scale = d3.scaleLinear()
      .domain([0, 100])
      .range([0, width]);

    // Background track
    svg.append('rect')
      .attr('y', height / 2 - barHeight / 2)
      .attr('width', width)
      .attr('height', barHeight)
      .attr('rx', 4)
      .attr('fill', '#ddd');

    // Filled track
    const filledTrack = svg.append('rect')
      .attr('y', height / 2 - barHeight / 2)
      .attr('width', scale(volume))
      .attr('height', barHeight)
      .attr('rx', 4)
      .attr('fill', '#4285f4');

    // Handle
    const handle = svg.append('circle')
      .attr('cx', scale(volume))
      .attr('cy', height / 2)
      .attr('r', 10)
      .attr('fill', '#fff')
      .attr('stroke', '#4285f4')
      .attr('stroke-width', 2)
      .attr('cursor', 'pointer');

    // Drag behavior
    const drag = d3.drag()
      .on('drag', function(event) {
        const x = Math.max(0, Math.min(width, event.x));
        const newVolume = Math.round(scale.invert(x));
        
        setVolume(newVolume);
        
        d3.select(this).attr('cx', scale(newVolume));
        filledTrack.attr('width', scale(newVolume));
      });

    handle.call(drag);

    // Click on track
    svg.on('click', function(event) {
      const x = d3.pointer(event)[0];
      const newVolume = Math.round(scale.invert(x));
      
      setVolume(newVolume);
      
      handle.attr('cx', scale(newVolume));
      filledTrack.attr('width', scale(newVolume));
    });

  }, [volume]);

  return (
    <div style={{ padding: '50px' }}>
      <svg ref={svgRef}></svg>
      <div style={{ marginTop: '10px', fontSize: '18px' }}>
        Volume: {volume}%
      </div>
    </div>
  );
}

export default VolumeSlider;