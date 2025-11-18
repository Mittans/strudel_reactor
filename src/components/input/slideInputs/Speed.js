import { useState } from "react";
import { IoMdSpeedometer, IoIosSpeedometer } from "react-icons/io";

export function Speed({text, updateEditor, speed, setSpeed}){

    /* Function updated the Speed*/
    function updateSpeedInCode(newSpeed, prodvidedText) {
        // Updated the speed.
        const updatedText = prodvidedText.replace(/setcps\([^)]*\)/, `setcps(140/60/4 * ${newSpeed})`);
        updateEditor(updatedText);
    }

    const handleSpeedChange = (e) => {
        const newSpeed = parseFloat(e.target.value);
        setSpeed(newSpeed);
        if (updateSpeedInCode) {
            // updates the speed in the text to process.
            updateSpeedInCode(newSpeed, text); 
        }
    };

    return (
        <div className="m-3 flex items-center border border-black rounded-lg bg-zinc-900 p-2">
            <label className="mr-2 font-medium">
                {speed < 0.5 ? 
                (<IoMdSpeedometer className="text-xl text-yellow-500"/>) : 
                (<IoIosSpeedometer className="text-xl text-yellow-500"/>)}
            </label>
            <input
                type="range"
                min="0.01"
                max="2"
                step="0.01"
                value={speed}
                onChange={handleSpeedChange}
                className="w-48 accent-yellow-500"
            />
            <span className="ml-2 font-bold text-yellow-500">{Math.round(speed * 100)}%</span>
        </div>
    );
}