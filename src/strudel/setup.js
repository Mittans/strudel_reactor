import {
  initStrudel,
  getAudioContext,
  webaudioOutput,
  registerSynthSounds,
  initAudioOnFirstClick,
  evalScope,
  transpiler,
} from "@strudel/web";
import { StrudelMirror } from "@strudel/codemirror";
import { registerSoundfonts } from "@strudel/soundfonts";

export async function setupStrudelEditor(editorId) {
  await initStrudel();

  const editor = new StrudelMirror({
    defaultOutput: webaudioOutput,
    getTime: () => getAudioContext().currentTime,
    transpiler,
    root: document.getElementById(editorId),
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

  return editor;
}
