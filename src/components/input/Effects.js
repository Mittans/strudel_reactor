import { useEffect, useState } from "react";
export function Effects({updateEditor, text}){
    const effectList = ["reverse","coarse","pan","crush"];
    const [selectedEffect,setSelectedEffect] = useState("None");
 
    useEffect (() => {
        // Determine effect based on chosen id.
        let effectString = "";
        if (selectedEffect === "reverse") effectString = ".rev()";
        else if (selectedEffect === "coarse") effectString = `.coarse("<1 4>")`;
        else if (selectedEffect === "pan") effectString = `.pan("<.5 1 .5 0>")`;
        else if (selectedEffect === "crush") effectString = `.crush("<16 8 7 6 5 4 3>")`;

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
            .replace(/\.pan\([^\)]*\)/g, "")
            .replace(/\.crush\([^\)]*\)/g, "");

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
        <div className={`grid grid-cols-3 sm:grid-cols-3 gap-3 p-4 mx-4`}>
            <div>
                <input 
                    className="hidden peer" 
                    type="radio" 
                    name="flexRadio" 
                    id="flexRadio-None" 
                    defaultChecked 
                    onChange={() => setSelectedEffect("None")}
                />
                <label 
                className="block text-center cursor-pointer peer-checked:bg-yellow-400 bg-zinc-800 text-yellow-200 hover:bg-yellow-500 hover:text-black rounded-lg px-4 py-3 font-semibold transition-all duration-200" 
                htmlFor="flexRadio-None">
                    None
                </label>
            </div>

            {/* List other effects */}
            {effectList.map((effect) => (
            <div>
                <input 
                    className="hidden peer" 
                    type="radio" 
                    name="flexRadio" 
                    id={`flexRadio-${effect}`} 
                    onChange={() => {
                        if (text.length===0) {
                            alert("Text is empty, please add appropriate text to allow add effects");
                        } else {
                        setSelectedEffect(effect)}
                    }
                    }/>
                <label 
                    className="block text-center cursor-pointer peer-checked:bg-yellow-400 bg-zinc-800 text-yellow-200 hover:bg-yellow-500 hover:text-black rounded-lg px-4 py-3 font-semibold transition-all duration-200" 
                    htmlFor={`flexRadio-${effect}`}>
                    {effect}
                </label>
            </div>
            ))}
        </div>
    );
}