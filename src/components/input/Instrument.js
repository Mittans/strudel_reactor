import { useEffect, useState } from 'react';

export function Instrument({text, updateEditor}){
    const instrumentList = ["RolandTR808","RolandTR606","KorgDDM110", "OberheimDmx"];
    const [selectedInstrument,setSelectedInstrument] = useState("None");

    useEffect (() => {
        // Determine if id is all then add all instrument list
        // Or else, remove all instrument in the text.
        let bankString = "";
        if (selectedInstrument === "All") {
            bankString = `.bank("[${instrumentList.join(", ")}]")`;
        } else if (selectedInstrument !== "None") {
            bankString = `.bank("${selectedInstrument}")`;
        }

        // lines to store the all the text
        const lines = text.split("\n");
        let inDrumsBlock = false;

        // Updated the text if any instrument is chosen.
        const updatedLines = lines.map(line => {
            const trimmed = line.trim();

            // Identify drums block
            if (/^drums\d*:/.test(trimmed)) {
                inDrumsBlock = true;
                return line;
            }

            // Identify other sections block
            if (/^[a-z_]+:/.test(trimmed) && !/^drums\d*:/.test(trimmed)) {
                inDrumsBlock = false;
            }

            // Modify s("…") lines inside drums.
            if (inDrumsBlock && trimmed.includes('s("')) {
                // Remove all existing .bank(...) first
                let cleaned = line.replace(/\.bank\([^\)]*\)/g, "");

                // Add new bank if exists
                if (bankString) {
                    return cleaned + bankString;
                } else {
                    return cleaned;
                }
            }

            return line;
        });

        updateEditor(updatedLines.join("\n"))
    }, [selectedInstrument]);

    return (
        <div className={`grid grid-cols-3 sm:grid-cols-3 gap-3 p-4 mx-4 `}>
            <div>
                <input 
                    className="hidden peer" 
                    type="radio" 
                    name="flexInstrument" 
                    id="flexInstrument-None" 
                    defaultChecked 
                    onChange={() => setSelectedInstrument("None")}
                />
                <label 
                className="block text-center cursor-pointer peer-checked:bg-yellow-400 bg-zinc-800 text-yellow-200 hover:bg-yellow-500 hover:text-black rounded-lg px-4 py-3 font-semibold transition-all duration-200" 
                htmlFor="flexInstrument-None">
                    None
                </label>
            </div>
            <div>
                <input 
                    className="hidden peer" 
                    type="radio" 
                    name="flexInstrument" 
                    id="flexInstrument-All" 
                    onChange={() => setSelectedInstrument("All")}
                    />
                <label 
                className="block text-center cursor-pointer peer-checked:bg-yellow-400 bg-zinc-800 text-yellow-200 hover:bg-yellow-500 hover:text-black rounded-lg px-4 py-3 font-semibold transition-all duration-200" 
                htmlFor="flexInstrument-All">
                    All
                </label>
            </div>

            {/* List other instrument */}
            {instrumentList.map((instrument) => (
                <div>
                <input 
                    className="hidden peer" 
                    type="radio" 
                    name="flexInstrument" 
                    id={`flexInstrument-${instrument}`} 
                    onChange={() => setSelectedInstrument(instrument)}
                />
                <label 
                className="block text-center cursor-pointer peer-checked:bg-yellow-400 bg-zinc-800 text-yellow-200 hover:bg-yellow-500 hover:text-black rounded-lg px-4 py-3 font-semibold transition-all duration-200" 
                htmlFor={`flexInstrument-${instrument}`}>
                    {instrument}
                </label>
            </div>
            ))}
        </div>
    );
}