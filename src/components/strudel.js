import { StrudelMirror } from '@strudel/codemirror';
import { evalScope } from '@strudel/core';
import { drawPianoroll } from '@strudel/draw';
import { initAudioOnFirstClick, getAudioContext, webaudioOutput, registerSynthSounds } from '@strudel/webaudio';
import { registerSoundfonts } from '@strudel/soundfonts';
import { transpiler } from '@strudel/transpiler';

let _editor = null;
let _ctx = null;

export const getEditor = () => _editor;

export function attachCanvas(canvasEl) {
    if (!canvasEl) { _ctx = null; return; }
    _ctx = canvasEl.getContext('2d');
}

export async function initStrudel({ editorRootEl }) {
    if (_editor) return _editor;

    const drawTime = [-2, 2];

    _editor = new StrudelMirror({
        defaultOutput: webaudioOutput,
        getTime: () => getAudioContext().currentTime,
        transpiler,
        root: editorRootEl,
        drawTime,
        onDraw: (haps, time) => {
            if (!_ctx) return;
            const { canvas } = _ctx;
            _ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawPianoroll({ haps, time, ctx: _ctx, drawTime, fold: 0 });
        },
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
