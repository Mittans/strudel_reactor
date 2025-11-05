import { useEffect, useState } from "react";
export function Effects({isOpenEffects, updateEditor, text}){
    const effectList = ["reverse","wave","pan"];
    const [selectedEffect,setSelectedEffect] = useState("None");
 
    useEffect (() => {
        // Determine effect based on chosen id.
        let effectString = "";
        if (selectedEffect === "reverse") effectString = ".rev()";
        else if (selectedEffect === "wave") effectString = `.coarse("<1 4>")`;
        else if (selectedEffect === "pan") effectString = `.pan("<.5 1 .5 0>")`;

        // Split text into lines and process
        const lines = text.split("\n").map(line => {
        const trimmed = line.trim();

        // Skip lines that is not musical.
        if (
            trimmed.startsWith("setcps") ||
            trimmed.startsWith("samples") ||
            trimmed === "" ||
            trimmed.startsWith("const ")
        ) {
            return line; 
        }

        // Modify musical pattern lines
        if (trimmed.includes("note(") || trimmed.includes("s(")) {

            // Remove existing effects first
            let cleaned = line
            .replace(/\.rev\(\)/g, "")
            .replace(/\.coarse\([^\)]*\)/g, "")
            .replace(/\.pan\([^\)]*\)/g, "");

            // Add effect if selected
            if (effectString) {
                return cleaned + effectString
            } else {
                return cleaned
            }
        }

        return line;
        });

        updateEditor(lines.join("\n"));
    },[selectedEffect])
    return (
        <div className={`flex mx-2 bg-black rounded-lg border border-black ${isOpenEffects ? "" : "hidden"}`}>
            <div className="m-2 p-2">
                <input 
                    className="hidden peer" 
                    type="radio" 
                    name="flexRadio" 
                    id="flexRadio-None" 
                    defaultChecked 
                    onChange={() => setSelectedEffect("None")}
                />
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor="flexRadio-None">
                    None
                </label>
            </div>
            {effectList.map((effect) => (
                 <div className="m-2 p-2">
                <input 
                    className="hidden peer" 
                    type="radio" 
                    name="flexRadio" 
                    id={`flexRadio-${effect}`} 
                    onChange={() => setSelectedEffect(effect)}/>
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor={`flexRadio-${effect}`}>
                    {effect}
                </label>
            </div>
            ))}
        </div>
    );
}