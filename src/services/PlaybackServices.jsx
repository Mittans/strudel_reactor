export function startPlayback(editor, ProcText, volume, preprocess) {
    const outputText = preprocess({ inputText: ProcText, volume: volume });
    editor.setCode(outputText);
    editor.evaluate();
}

export function stopPlayback(editor) {
    editor.stop();
}