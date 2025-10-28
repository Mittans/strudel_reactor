import React from 'react';

export default function TransportControl({ onProcess, onProcessPlay, onPlay, onStop }) {
    return (
        <nav>
            <button className="btn btn-outline-primary" onClick={onProcess}>Preprocess</button>
            <button className="btn btn-outline-primary" onClick={onProcessPlay}>Proc & Play</button>
            <br />
            <button className="btn btn-outline-primary" onClick={onPlay}>Play</button>
            <button className="btn btn-outline-primary" onClick={onStop}>Stop</button>
        </nav>
    );
}
