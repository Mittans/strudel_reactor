import { CiVolumeHigh, CiVolumeMute } from "react-icons/ci";
import { FaVolumeDown, FaVolumeMute, FaVolumeUp } from "react-icons/fa";
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
        <div className="m-3 flex items-center border border-black rounded-lg bg-black p-2">
            <label className="mr-2 font-medium"> 
                {volume === 0 ? (
                <FaVolumeMute className="text-xl text-yellow-500" />
                ) : volume < 0.5 ? (
                <FaVolumeDown className="text-xl text-yellow-500" />
                ) : (
                <FaVolumeUp className="text-xl text-yellow-500" />
                )}
            </label>
            <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-48 accent-yellow-500"
            />
            <span className="ml-2 text-yellow-500">{Math.round(volume * 100)}%</span>
        </div>
    );
}