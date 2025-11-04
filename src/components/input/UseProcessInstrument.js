export function useProcessInstrument({updateEditor, instrumentList}) {
    function processInstrument(text) {
        // Get the selected radio button.
        const selected = document.querySelector('input[name="flexInstrument"]:checked');
        if (!selected) return text;

        // Get the id for each radio.
        const id = selected.id.replace("flexInstrument-", "");

        // Determine if id is all then add all instrument list
        // Or else, remove all instrument in the text.
        let bankString = "";
        if (id === "All") {
            bankString = `.bank("[${instrumentList.join(", ")}]")`;
        } else if (id !== "None") {
            bankString = `.bank("${id}")`;
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

        return updatedLines.join("\n");
    }

    function handleInstrumentChange() {
        const currentText = document.getElementById("proc").value;
        const updatedText = processInstrument(currentText);
        updateEditor(updatedText);
    }

    return { handleInstrumentChange };
}
