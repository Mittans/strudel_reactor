import { useEffect, useState } from "react";

export function Volume(props) {
    const [volume, setVolumeState] = useState(0.5); 

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolumeState(newVolume);
        if (props.onVolumeChange) {
            props.onVolumeChange(newVolume); // updates the gain in the Strudel text
        }
    };

    return (
        <div className="m-3 flex items-center border border-black rounded-lg bg-gray-300 p-3">
            <label className="mr-2 font-medium">Volume:</label>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-48 "
            />
            <span className="ml-2">{Math.round(volume * 100)}%</span>
        </div>
    );
}