import { strudelActions } from "./strudelSetup";

export function ProcessText(match, ...args) {
  let replace = "";
  if (document.getElementById("flexRadioDefault2").checked) {
    replace = "_";
  }

  return replace;
}

export function Proc() {
  let proc_text = document.getElementById("proc").value;
  let proc_text_replaced = proc_text.replaceAll("<p1_Radio>", ProcessText);
  ProcessText(proc_text);
  strudelActions.setCode(proc_text_replaced);
}

export function ProcAndPlay() {
  if (strudelActions.setCode && strudelActions.isStarted) {
    Proc();
    strudelActions.evaluate();
  }
}
