import { getEditor } from './strudel';

export function ProcessText() {
    const hush = document.getElementById('flexRadioDefault2')?.checked;
    return hush ? "_" : "cp*2"; 
}

export function Proc() {
    const editor = getEditor();
    if (!editor) return;

    const srcEl = document.getElementById('proc');
    if (!srcEl) return;

    const procText = srcEl.value;
    const replaced = procText.replaceAll('<p1_Radio>', ProcessText);
    editor.setCode(replaced);
}

export function ProcAndPlay() {
    const editor = getEditor();
    if (editor && editor.repl?.state?.started === true) {
        Proc();
        editor.evaluate();
    }
}

export function SetupButtons() {
    const editor = getEditor();
    const byId = (id) => document.getElementById(id);

    byId('play')?.addEventListener('click', () => editor?.evaluate());
    byId('stop')?.addEventListener('click', () => editor?.stop());
    byId('process')?.addEventListener('click', () => Proc());
    byId('process_play')?.addEventListener('click', () => {
        if (getEditor()) {
            Proc();
            getEditor().evaluate();
        }
    });
}
