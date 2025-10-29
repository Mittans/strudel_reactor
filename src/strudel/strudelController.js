import { initializeStrudel, strudelActions } from "./strudelSetup";

// Initialize strudel
export async function initStrudel(intialCode) {
  await initializeStrudel(intialCode);
}

// Play the current tune
export function playTune() {
  strudelActions.evaluate();
}

// Stop all playback
export function stopTune() {
  strudelActions.stop();
}

// set tempo of the song (BPM)
export function setTempo(bpm) {
  let proc_text = document.getElementById("proc").value;
  let proc_text_replaced = proc_text.replace(
    /setcps\([^)]*\)/g,
    `setcps(${bpm}/60/4)`
  );

  strudelActions.setCode(proc_text_replaced);

  // re-run the song with new tempo
  if (strudelActions.evaluate) {
    strudelActions.evaluate();
  }
}

// TODO: Do something with the volume
// set volume
export function setVolume(volume) {}
