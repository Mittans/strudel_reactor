import { useEffect, useState } from 'react';

export function Instrument({ text, updateEditor }) {
  const instrumentList = ["AlesisHR16","AkaiXR10","AkaiMPC60", "AkaiLinn","BossDR110","KorgDDM110", "OberheimDmx","RolandTR606", "RolandTR808"];
  const [selectedInstruments, setSelectedInstruments] = useState([]);

  useEffect(() => {
    let bankString = "";

    // If selectedInstrument has at least one instrument, bank(..) will be added.
    if (selectedInstruments.length > 0) {
      bankString = `.bank("[${selectedInstruments.join(", ")}]")`;
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

      // Add bank(..) lines inside drums.
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

    updateEditor(updatedLines.join("\n"));
  }, [selectedInstruments]);

  const handleCheckboxChange = (instrument) => {
    // Toggles an instrument in the selected list
    // If instrument is already existed, don't add instrument. 
    // If instrument is not existed, add to the selected instrument list.
    setSelectedInstruments(prev =>
      prev.includes(instrument)
        ? prev.filter(i => i !== instrument)
        : [...prev, instrument]
    );
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 mx-4">
      {instrumentList.map(instrument => (
        <div key={instrument}>
          <input
            className="hidden peer"
            type="checkbox"
            id={`checkbox-${instrument}`}
            onChange={() => {if (text.length === 0) {
              alert("Text empty, please something to add instrument")
            } else {
              handleCheckboxChange(instrument)
            }}}
          />
          <label
            className="block text-center cursor-pointer peer-checked:bg-yellow-400 bg-zinc-800 text-yellow-200 hover:bg-yellow-500 hover:text-black rounded-lg px-4 py-3 font-semibold transition-all duration-200"
            htmlFor={`checkbox-${instrument}`}
          >
            {instrument}
          </label>
        </div>
      ))}
    </div>
  );
}
