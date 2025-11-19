import { getGlobalEditor } from './globalEditor.js';

// function running the proc and play
export function ProcAndPlay() {
    const editor = getGlobalEditor();
    if (editor != null && editor.repl.state.started === true) {
        console.log(editor)
        Proc()
        editor.evaluate();
    }
}

// preprocerss the text in the textarea
export function Proc() {
    const editor = getGlobalEditor();
    if (!editor) {
        return;


    }
    let proc_text = document.getElementById('proc').value

    // UI elements
    const volumeEl = document.getElementById('volume_slider');
    const cpmEl = document.getElementById('cpm_input');
    const masterVolElement = document.getElementById('master_volume_slider');
    const patternElement = document.getElementById('pattern_select');
    const basslineElement = document.getElementById('bassline_select');
    const roomElement = document.getElementById('room_slider');
    const lpfElement = document.getElementById('lpf_slider');

    // extracting values from UI elements with defaults
    const masterVolValue = masterVolElement ? masterVolElement.value : "1.0";
    const currentVolume = volumeEl ? volumeEl.value : "0.8";
    const currentCPM = cpmEl ? cpmEl.value : "120";
    const patternValue = patternElement ? patternElement.value : "0";
    const basslineValue = basslineElement ? basslineElement.value : "0";
    const lpfValue = lpfElement ? lpfElement.value : "5000";
    const roomValue = roomElement ? roomElement.value : "0.6";

    // radio toggles
    const p1Hush = document.getElementById('flexRadioDefault2');
    const p2Hush = document.getElementById('flexRadioDefault4');
    const p3Hush = document.getElementById('flexRadioDefault6');

    const p1Gain = p1Hush && p1Hush.checked ? "0.0" : "1.0";
    const p2Gain = p2Hush && p2Hush.checked ? "0.0" : "1.0";
    const p3Gain = p3Hush && p3Hush.checked ? "0.0" : "1.0";






    let proc_text_replaced = proc_text;


    // Replace placeholder tags with actual control values
    proc_text_replaced = proc_text_replaced
        .replaceAll('<MASTER_VOLUME>', masterVolValue)
        .replaceAll('<PATTERN>', patternValue)
        .replaceAll('<VOLUME>', currentVolume)
        .replaceAll('<CPM>', currentCPM)
        .replaceAll('<BASSLINE>', basslineValue)
        .replaceAll('<ROOM>', roomValue)
        .replaceAll("<LPF>", lpfValue)
        .replaceAll('<P1_GAIN>', p1Gain)
        .replaceAll('<P2_GAIN>', p2Gain)
        .replaceAll('<P3_GAIN>', p3Gain);  



    console.log("PROC AFTER REPLACE:", proc_text_replaced);


    ProcessText(proc_text);
    editor.setCode(proc_text_replaced)
}

// function to process text based on radio button selection
export function ProcessText(match, ...args) {

    let replace = ""
    if (document.getElementById('flexRadioDefault2').checked) {
        replace = "_"
    }

    return replace
}