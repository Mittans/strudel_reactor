import { Proc } from "./processor";

export function SetupButtons(globalEditor) {
  document.getElementById("play").addEventListener("click", () => {
    if (!globalEditor) return;
    globalEditor.evaluate();
  });
  document.getElementById("stop").addEventListener("click", () => {
    if (!globalEditor) return;
    globalEditor.stop();
  });
  document.getElementById("process").addEventListener("click", () => {
    if (!globalEditor) return;
    Proc(globalEditor);
  });
  document.getElementById("process_play").addEventListener("click", () => {
    if (globalEditor) {
      Proc(globalEditor);
      globalEditor.evaluate();
    }
  });
}
