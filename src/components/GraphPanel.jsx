import { useEffect, useRef } from 'react';
import { attachCanvas, getEditor } from './strudel';
import { Proc } from './preprocess';

export default function GraphPanel() {
    const canvasRef = useRef(null);

    
    useEffect(() => {
        const c = canvasRef.current;
        if (c) {
            const cssWidth = c.clientWidth || 800;
            const cssHeight = 200;

            c.width = cssWidth;
            c.height = cssHeight;

            attachCanvas(c);

            const editor = getEditor();
            if (editor) {
                Proc();
                if (editor.repl?.state?.started) editor.evaluate();
            }
        }

        //resizing handler, to redraw what's on the graph when it changes.
        const onResize = () => {
            const c = canvasRef.current;
            if (!c) return;
            const cssWidth = c.clientWidth || 800;
            const cssHeight = 200;
            c.width = cssWidth;
            c.height = cssHeight;
            attachCanvas(c);
            const editor = getEditor();
            if (editor) editor.evaluate();
        };
        window.addEventListener('resize', onResize);

        return () => {
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
