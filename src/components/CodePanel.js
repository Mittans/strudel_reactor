import React, { useEffect, useRef } from 'react';
import { initStrudel } from '../lib/strudel';
import { Proc } from '../lib/preprocess';

export default function CodePanel() {
    const hasRun = useRef(false);
    const editorRef = useRef(null);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        (async () => {
            await initStrudel({ editorRootEl: editorRef.current });
            Proc();
        })();
    }, []);

    return React.createElement(
        'div',
        { className: 'card h-100' },
        React.createElement('div', { className: 'card-header fw-semibold' }, 'Editor / Output'),
        React.createElement(
            'div',
            { className: 'card-body' },
            React.createElement('div', { id: 'editor', ref: editorRef }),
            React.createElement('div', { id: 'output' })
        )
    );
}
