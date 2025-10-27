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
  if (window.setcps) {
    window.setcps(bpm / 60 / 4);
  }
}

// TODO: Do something with the volume
// set volume
export function setVolume(volume) {}
