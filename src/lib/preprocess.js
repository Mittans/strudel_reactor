import { getEditor } from './strudel';

const el = (id) => document.getElementById(id);
const isOn = (id) => !!el(id)?.checked;

export function Proc() {
    const editor = getEditor();
    const src = el('proc');
    if (!editor || !src) return;

    const tempo = Number(el('tempo')?.value) || 140;
    const bass  = isOn('toggle-bass') ? 1 : 0;
    const arp   = isOn('toggle-arp')  ? 1 : 0;
    const dr1   = isOn('toggle-dr1')  ? 1 : 0;
    // const dr2   = isOn('toggle-dr2')  ? 1 : 0;

    const out = src.value
        .replaceAll('<tempo_value>', String(tempo))
        .replaceAll('<bass_gain>',   String(bass))
        .replaceAll('<arp_gain>',    String(arp))
        .replaceAll('<drums1_gain>', String(dr1))
        // .replaceAll('<drums2_gain>', String(dr2));

    editor.setCode(out);
}

export function ProcAndPlay() {
    const editor = getEditor();
    if (!editor) return;
    Proc();
    editor.evaluate(); 
}

export function SetupButtons() {
    const editor = getEditor();
    el('process')?.addEventListener('click', () => Proc());
    el('process_play')?.addEventListener('click', () => { Proc(); editor?.evaluate(); });
    el('play')?.addEventListener('click', () => editor?.evaluate());
    el('stop')?.addEventListener('click', () => editor?.stop());
}
