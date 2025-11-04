import React, { useEffect, useRef } from 'react';
import { attachCanvas } from '../lib/strudel';
import console_monkey_patch from '../console-monkey-patch';

export default function GraphPanel() {
    const canvasRef = useRef(null);
    const wired = useRef(false);

    useEffect(() => {
        if (!wired.currentxx) {
            console_monkey_patch();
            wired.current = true;
        }

        const handleD3Data = (event) => {
        };
        document.addEventListener('d3Data', handleD3Data);

        const c = canvasRef.current;
        if (c) {
            c.width = c.width * 2;
            c.height = c.height * 2;
            attachCanvas(c);
        }

        return () => {
            document.removeEventListener('d3Data', handleD3Data);
            attachCanvas(null);
        };
    }, []);

    return React.createElement(
        'div',
        { className: 'card h-100' },
        React.createElement('div', { className: 'card-header fw-semibold' }, 'Live Graph'),
        React.createElement(
            'div',
            { className: 'card-body' },
            React.createElement('canvas', { id: 'roll', ref: canvasRef, width: 600, height: 200, className: 'w-100 border rounded' })
        )
    );
}
