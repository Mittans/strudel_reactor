import { useEffect, useRef } from 'react';
import { attachCanvas, getEditor } from '../lib/strudel';
import { Proc } from '../lib/preprocess';
import console_monkey_patch from '../console-monkey-patch';

export default function GraphPanel() {
    const canvasRef = useRef(null);
    const wired = useRef(false);

    useEffect(() => {
        if (!wired.current) {
            console_monkey_patch();
            wired.current = true;
        }

        const handleD3Data = () => {};
        document.addEventListener('d3Data', handleD3Data);

        const c = canvasRef.current;
        if (c) {
            const dpr = window.devicePixelRatio || 1;
            const cssWidth = c.clientWidth || 800;
            const cssHeight = 200;
            c.width = Math.round(cssWidth * dpr);
            c.height = Math.round(cssHeight * dpr);
            const ctx = c.getContext('2d');
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            attachCanvas(c);

            const editor = getEditor();
            if (editor) {
                Proc();
                if (editor.repl?.state?.started) editor.evaluate();
            }
        }

        const onResize = () => {
            const c = canvasRef.current;
            if (!c) return;
            const dpr = window.devicePixelRatio || 1;
            const cssWidth = c.clientWidth || 800;
            const cssHeight = 200;
            c.width = Math.round(cssWidth * dpr);
            c.height = Math.round(cssHeight * dpr);
            const ctx = c.getContext('2d');
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            attachCanvas(c);
            const editor = getEditor();
            if (editor) editor.evaluate();
        };
        window.addEventListener('resize', onResize);

        return () => {
            document.removeEventListener('d3Data', handleD3Data);
            window.removeEventListener('resize', onResize);
            attachCanvas(null);
        };
    }, []);

    return (
        <div className="card h-100">
            <div className="card-header fw-semibold">Live Graph</div>
            <div className="card-body d-flex justify-content-center">
                <canvas
                    id="roll"
                    ref={canvasRef}
                    className="border rounded mx-auto d-block"
                    height={200}
                    style={{ width: '800px', maxWidth: '100%' }}
                />
            </div>
        </div>
    );
}
