export function useProcessEffect({ updateEditor }) {
  function processEffect(text) {
    const selected = document.querySelector('input[name="flexRadio"]:checked');
    if (!selected) return text;

    const id = selected.id.replace("flexRadio-", "");

    // Determine effect based on chosen id.
    let effectString = "";
    if (id === "reverse") effectString = ".rev()";
    else if (id === "wave") effectString = `.coarse("<1 4>")`;
    else if (id === "pan") effectString = `.pan("<.5 1 .5 0>")`;

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

    return lines.join("\n");
  }

  function handleEffectChange() {
    const currentText = document.getElementById("proc").value;
    const updatedText = processEffect(currentText);
    updateEditor(updatedText);
  }

  return { handleEffectChange };
}
