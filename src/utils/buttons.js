
import { getGlobalEditor } from './globalEditor';
import { Proc } from './proc';

export function SetupButtons() {
    const editor = getGlobalEditor();

    document.getElementById('play')?.addEventListener('click', () => editor?.evaluate());
    document.getElementById('stop')?.addEventListener('click', () => editor?.stop());
    document.getElementById('process')?.addEventListener('click', () => {
        Proc()
    }

    )
    document.getElementById('process_play')?.addEventListener('click', () => {
        if (editor != null) {
            Proc()
            editor.evaluate()
        }
    }
    )
}