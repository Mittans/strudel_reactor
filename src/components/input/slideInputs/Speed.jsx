import { useState } from "react";

export function Speed(props){
    const [speed, setSpeed] = useState(0.5); 

    const handleSpeedChange = (e) => {
        const newSpeed = parseFloat(e.target.value);
        setSpeed(newSpeed);
        if (props.onSpeedChange) {
            // updates the speed in the text to process.
            props.onSpeedChange(newSpeed); 
        }
    };

    return (
        <div className="m-3 flex items-center border border-black rounded-lg bg-gray-300 px-2">
            <label className="mr-2 font-medium">Speed:</label>
            <input
                type="range"
                min="0"
                max="2"
                step="0.01"
                value={speed}
                onChange={handleSpeedChange}
                className="w-48 "
            />
            <span className="ml-2">{Math.round(speed * 100)}%</span>
        </div>
    );
}