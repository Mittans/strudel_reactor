
import { getGlobalEditor } from './globalEditor';
import { Proc } from './proc';

export function SetupButtons() {
    const editor = getGlobalEditor();

    document.getElementById('play')?.addEventListener('click', () => editor?.evaluate());
    document.getElementById('stop')?.addEventListener('click', () => editor?.stop());
    document.getElementById('process')?.addEventListener('click', () => {
        Proc()
    })
    document.getElementById('process_play')?.addEventListener('click', () => {
        if (editor != null) {
            Proc()
            editor.evaluate()
        }

    }
    )


    const vol = document.getElementById('volume_slider');
    const cpm = document.getElementById('cpm_input');

    const reevalIfPlaying = () => {
        if (editor && editor.repl?.state?.started) {
            Proc();
            editor.evaluate();
        }
    };

    vol?.addEventListener('input', reevalIfPlaying);   
    cpm?.addEventListener('change', reevalIfPlaying);

    const patternSelect = document.getElementById('pattern_select');
    patternSelect?.addEventListener('change', reevalIfPlaying);

}