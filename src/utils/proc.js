import { getGlobalEditor } from './globalEditor.js';

export function ProcAndPlay() {
    const editor = getGlobalEditor();
    if (editor != null && editor.repl.state.started == true) {
        console.log(editor)
        Proc()
        editor.evaluate();
    }
}

export function Proc() {
    const editor = getGlobalEditor();
    if (!editor) {
        return;
    }


    let proc_text = document.getElementById('proc').value
    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);
    ProcessText(proc_text);
    editor.setCode(proc_text_replaced)
}

export function ProcessText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_"
    }

    return replace
}