import { useState } from "react";

export function Volume() {
    const [volume, setVolume] = useState(0.5); 

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    };

    return (
        <div className="m-3 flex items-center border border-black rounded-lg bg-gray-300 px-2">
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