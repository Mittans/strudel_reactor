import React from 'react';
import { ProcAndPlay } from '../../lib/preprocess';

export default function InstrumentToggle() {
    return React.createElement(
        'div',
        { className: 'card' },
        React.createElement('div', { className: 'card-header fw-semibold' }, 'Instrument p1'),
        React.createElement(
            'div',
            { className: 'card-body d-flex flex-column gap-2' },
            React.createElement(
                'div',
                { className: 'form-check' },
                React.createElement('input', {
                    className: 'form-check-input',
                    type: 'radio',
                    name: 'flexRadioDefault',
                    id: 'flexRadioDefault1',
                    defaultChecked: true,
                    onChange: ProcAndPlay
                }),
                React.createElement('label', { className: 'form-check-label', htmlFor: 'flexRadioDefault1' }, 'p1: ON')
            ),
            React.createElement(
                'div',
                { className: 'form-check' },
                React.createElement('input', {
                    className: 'form-check-input',
                    type: 'radio',
                    name: 'flexRadioDefault',
                    id: 'flexRadioDefault2',
                    onChange: ProcAndPlay
                }),
                React.createElement('label', { className: 'form-check-label', htmlFor: 'flexRadioDefault2' }, 'p1: HUSH')
            )
        )
    );
}
