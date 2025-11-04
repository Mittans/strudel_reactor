import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick, getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { transpiler } from '@strudel/transpiler';

let _editor = null;
export const getEditor = () => _editor;

export async function initStrudel({ editorRootEl, canvasEl }) {
    const drawContext = canvasEl.getContext('2d');
    const drawTime = [-2, 2];

    _editor = new StrudelMirror({
        defaultOutput: webaudioOutput,
        getTime: () => getAudioContext().currentTime,
        transpiler,
        root: editorRootEl,
        drawTime,
        onDraw: (haps, time) => drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
        prebake: async () => {
            initAudioOnFirstClick();
            const loadModules = evalScope(
                import('@strudel/core'),
                import('@strudel/draw'),
                import('@strudel/mini'),
                import('@strudel/tonal'),
                import('@strudel/webaudio'),
            );
            await Promise.all([loadModules, registerSynthSounds(), registerSoundfonts()]);
        },
    });

    return _editor;
}
