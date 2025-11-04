import React, { useEffect, useRef } from 'react';
import { initStrudel } from '../lib/strudel';
import console_monkey_patch from '../console-monkey-patch';

export default function GraphPanel() {
    const hasRun = useRef(false);
    const canvasRef = useRef(null);
    const editorRef = useRef(null);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        const handleD3Data = (event) => {
            console.log(event.detail);
        };
        document.addEventListener('d3Data', handleD3Data);
        console_monkey_patch();

        const c = canvasRef.current;
        c.width = c.width * 2;
        c.height = c.height * 2;

        initStrudel({
            editorRootEl: editorRef.current,
            canvasEl: c
        });

        return () => document.removeEventListener('d3Data', handleD3Data);
    }, []);

    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            'div',
            { className: 'card mt-3' },
            React.createElement('div', { className: 'card-header fw-semibold' }, 'Editor / Output'),
            React.createElement(
                'div',
                { className: 'card-body' },
                React.createElement('div', { id: 'editor', ref: editorRef }),
                React.createElement('div', { id: 'output' })
            )
        ),
        React.createElement(
            'div',
            { className: 'card mt-3' },
            React.createElement('div', { className: 'card-header fw-semibold' }, 'Live Graph'),
            React.createElement(
                'div',
                { className: 'card-body' },
                React.createElement('canvas', { id: 'roll', ref: canvasRef, width: 600, height: 200, className: 'w-100 border rounded' })
            )
        )
    );
}
