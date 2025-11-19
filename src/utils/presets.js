import { ProcAndPlay } from './proc';
// LocalStorage key used to save and load presets
const PRESET_KEY = 'strudel_reactor_preset_1';

// saving all the UI control valuses into localStorage
export function savePreset() {
    const preset = {
        masterVolume: document.getElementById('master_volume_slider')?.value ?? '0.8',
        volume: document.getElementById('volume_slider')?.value ?? '0.8',
        cpm: document.getElementById('cpm_input')?.value ?? '140',
        lpf: document.getElementById('lpf_slider')?.value ?? '5000',
        room: document.getElementById('room_slider')?.value ?? '0.6',
        pattern: document.getElementById('pattern_select')?.value ?? '0',
        bassline: document.getElementById('bassline_select')?.value ?? '0',
        p1Hush: document.getElementById('flexRadioDefault2')?.checked ?? false,
        p2Hush: document.getElementById('flexRadioDefault4')?.checked ?? false,
        p3Hush: document.getElementById('flexRadioDefault6')?.checked ?? false,
    };

    try {
        localStorage.setItem(PRESET_KEY, JSON.stringify(preset));
        console.log('Preset saved:', preset);
    } catch (err) {
        console.error('Could not save preset', err);
    }
}

// loading the UI control values from localStorage
export function loadPreset() {
    let raw;
    // reading the preset from localStorage
    try {
        raw = localStorage.getItem(PRESET_KEY);
        if (!raw) {
            console.warn('No preset saved yet');
            return;
        }
    } catch (err) {
        console.error('Could not read preset', err);
        return;
    }

    try {
        const preset = JSON.parse(raw);

        const setVal = (id, value) => {
            const el = document.getElementById(id);
            if (el && value !== undefined) {
                el.value = value;
            }
        };

        // Restore numeric, slider controls
        setVal('master_volume_slider', preset.masterVolume);
        setVal('volume_slider', preset.volume);
        setVal('cpm_input', preset.cpm);
        setVal('lpf_slider', preset.lpf);
        setVal('room_slider', preset.room);
        setVal('pattern_select', preset.pattern);
        setVal('bassline_select', preset.bassline);

        // Restore radio button pairs
        const setRadioPair = (onId, hushId, hush) => {
            const onEl = document.getElementById(onId);
            const hushEl = document.getElementById(hushId);
            if (!onEl || !hushEl) return;
            hushEl.checked = !!hush;
            onEl.checked = !hush;
        };

        setRadioPair('flexRadioDefault1', 'flexRadioDefault2', preset.p1Hush);
        setRadioPair('flexRadioDefault3', 'flexRadioDefault4', preset.p2Hush);
        setRadioPair('flexRadioDefault5', 'flexRadioDefault6', preset.p3Hush);

        // Rerun preprocessing and restart playback
        ProcAndPlay();
    } catch (err) {
        console.error('Could not apply preset', err);
    }
}
