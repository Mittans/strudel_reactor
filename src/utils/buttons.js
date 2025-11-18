
import { getGlobalEditor } from './globalEditor';
import { Proc } from './proc';
import { savePreset, loadPreset } from './presets';

// Sets up all UI and its event bindings
export function SetupButtons() {
    const editor = getGlobalEditor();

    document.getElementById('play')?.addEventListener('click', () => editor?.evaluate());
    document.getElementById('stop')?.addEventListener('click', () => editor?.stop());
    // // Preprocess
    document.getElementById('process')?.addEventListener('click', () => {
        Proc()
    })
    // Preprocess and immediately play
    document.getElementById('process_play')?.addEventListener('click', () => {
        if (editor != null) {
            Proc()
            editor.evaluate()
        }

    }
    )

    // selecting elements based on their IDs
    const vol = document.getElementById('volume_slider');
    const cpm = document.getElementById('cpm_input');
    const masterVol = document.getElementById('master_volume_slider');
    const basslineSelect = document.getElementById('bassline_select');
    const lpf = document.getElementById('lpf_slider');
    const room = document.getElementById('room_slider');
    const savePresetBtn = document.getElementById('save_preset');
    const loadPresetBtn = document.getElementById('load_preset');



    // This function reevaluates the code if the REPL is currently playing
    const reevalIfPlaying = () => {
        if (editor && editor.repl?.state?.started) {
            Proc();
            editor.evaluate();
        }
    };

    // Live re-evaluation from UI changes
    vol?.addEventListener('input', reevalIfPlaying);   
    cpm?.addEventListener('change', reevalIfPlaying);

    const patternSelect = document.getElementById('pattern_select');
    patternSelect?.addEventListener('change', reevalIfPlaying);

    masterVol?.addEventListener('input', reevalIfPlaying);
    basslineSelect?.addEventListener('change', reevalIfPlaying);
    lpf?.addEventListener('input', reevalIfPlaying);
    room?.addEventListener('input', reevalIfPlaying);
    savePresetBtn?.addEventListener('click', savePreset);
    loadPresetBtn?.addEventListener('click', loadPreset);




}