import { StrudelMirror } from "@strudel/codemirror";
import { evalScope } from "@strudel/core";
import { drawPianoroll } from "@strudel/draw";
import { initAudioOnFirstClick } from "@strudel/webaudio";
import { transpiler } from "@strudel/transpiler";
import {
  getAudioContext,
  webaudioOutput,
  registerSynthSounds,
} from "@strudel/webaudio";
import { registerSoundfonts } from "@strudel/soundfonts";
import console_monkey_patch from "../console-monkey-patch";

let globalEditor = null;

const handleD3Data = (event) => {
  console.log(event.detail);
};

export async function initializeStrudel(intialCode) {
  if (globalEditor) return;

  document.addEventListener("d3Data", handleD3Data);
  console_monkey_patch();

  //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
  //init canvas
  const canvas = document.getElementById("roll");
  canvas.width = canvas.width * 2;
  canvas.height = canvas.height * 2;
  const drawContext = canvas.getContext("2d");
  const drawTime = [-2, 2]; // time window of drawn haps

  globalEditor = new StrudelMirror({
    defaultOutput: webaudioOutput,
    getTime: () => getAudioContext().currentTime,
    transpiler,
    root: document.getElementById("editor"),
    drawTime,
    onDraw: (haps, time) =>
      drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
    prebake: async () => {
      initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
      const loadModules = evalScope(
        import("@strudel/core"),
        import("@strudel/draw"),
        import("@strudel/mini"),
        import("@strudel/tonal"),
        import("@strudel/webaudio")
      );
      await Promise.all([
        loadModules,
        registerSynthSounds(),
        registerSoundfonts(),
      ]);
    },
  });

  // Make the output not editable
  const cmContent = document.querySelector("#editor .cm-content");
  if (cmContent) {
    cmContent.setAttribute("contenteditable", "false");
  }

  if (intialCode) {
    globalEditor.setCode(intialCode);
  }

  return globalEditor;
}

export const strudelActions = {
  evaluate: () => globalEditor?.evaluate(),
  stop: () => globalEditor?.stop(),
  setCode: (code) => globalEditor?.setCode(code),
};
