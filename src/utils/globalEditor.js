let globalEditor = null; // storing strudel editor instance

// getter and setter for global editor
export function setGlobalEditor(editor) {
    globalEditor = editor;
}

export function getGlobalEditor() {
    return globalEditor;
}