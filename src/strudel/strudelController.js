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
