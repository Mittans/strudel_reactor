import React, { useEffect } from 'react';
import { stranger_tune } from '../tunes';

export default function Editor() {
    useEffect(() => {
        const el = document.getElementById('proc');
        if (el && !el.value) el.value = stranger_tune;
    }, []);

    return React.createElement(
        'div',
        { className: 'card' },
        React.createElement('div', { className: 'card-header fw-semibold' }, 'Text to preprocess'),
        React.createElement(
            'div',
            { className: 'card-body' },
            React.createElement('textarea', {
                className: 'form-control font-monospace',
                rows: 15,
                id: 'proc'
            })
        )
    );
}
