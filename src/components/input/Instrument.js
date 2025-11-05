import { useEffect, useState } from 'react';

export function Instrument({text, updateEditor, isOpenInstrument}){
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
        <div className={`flex mx-2 bg-black rounded-lg border border-black ${isOpenInstrument ? "" : "hidden"}`}>
            <div className="m-2 p-2">
                <input 
                    className="hidden peer" 
                    type="radio" 
                    name="flexInstrument" 
                    id="flexInstrument-None" 
                    defaultChecked 
                    onChange={() => setSelectedInstrument("None")}
                />
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor="flexInstrument-None">
                    None
                </label>
            </div>
            <div className="m-2 p-2">
                <input 
                    className="hidden peer" 
                    type="radio" 
                    name="flexInstrument" 
                    id="flexInstrument-All" 
                    onChange={() => setSelectedInstrument("All")}
                    />
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor="flexInstrument-All">
                    All
                </label>
            </div>
            {instrumentList.map((instrument) => (
                    <div className="m-2 p-2">
                <input 
                    className="hidden peer" 
                    type="radio" 
                    name="flexInstrument" 
                    id={`flexInstrument-${instrument}`} 
                    onChange={() => setSelectedInstrument(instrument)}
                />
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor={`flexInstrument-${instrument}`}>
                    {instrument}
                </label>
            </div>
            ))}
        </div>
    );
}