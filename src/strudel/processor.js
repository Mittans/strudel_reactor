export function ProcessText(match, ...args) {
  let replace = "";
  if (document.getElementById("flexRadioDefault2").checked) {
    replace = "_";
  }

  return replace;
}

export function Proc(globalEditor) {
  if (!globalEditor) {
    return;
  }

  let proc_text = document.getElementById("proc").value;
  let proc_text_replaced = proc_text.replaceAll("<p1_Radio>", ProcessText);
  ProcessText(proc_text);
  globalEditor.setCode(proc_text_replaced);
}

export function ProcAndPlay(globalEditor) {
  if (globalEditor != null && globalEditor.repl.state.started === true) {
    console.log(globalEditor);
    Proc(globalEditor);
    globalEditor.evaluate();
  }
}
