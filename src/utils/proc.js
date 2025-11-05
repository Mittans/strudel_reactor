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

    const volumeEl = document.getElementById('volume_slider');
    const cpmEl = document.getElementById('cpm_input');
    const currentVolume = volumeEl ? volumeEl.value : "0.8";
    const currentCPM = cpmEl ? cpmEl.value : "120";

    let proc_text_replaced = proc_text.replaceAll('<p1_Radio>', ProcessText);

    proc_text_replaced = proc_text_replaced
        .replaceAll('<VOLUME>', currentVolume)
        .replaceAll('<CPM>', currentCPM);

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