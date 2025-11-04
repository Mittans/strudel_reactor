import React from 'react';

export default function TransportControls() {
    return React.createElement(
        'div',
        { className: 'card' },
        React.createElement('div', { className: 'card-header fw-semibold' }, 'Transport'),
        React.createElement(
            'div',
            { className: 'card-body d-flex flex-wrap gap-2' },
            React.createElement('button', { id: 'process', className: 'btn btn-outline-primary' }, 'Preprocess'),
            React.createElement('button', { id: 'process_play', className: 'btn btn-outline-primary' }, 'Proc & Play'),
            React.createElement('button', { id: 'play', className: 'btn btn-outline-primary' }, 'Play'),
            React.createElement('button', { id: 'stop', className: 'btn btn-outline-primary' }, 'Stop')
        )
    );
}
