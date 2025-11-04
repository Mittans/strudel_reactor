import { useEffect, useRef } from 'react';
import { initStrudel } from '../lib/strudel';
import { Proc } from '../lib/preprocess';

export default function CodePanel() {
    const hasRun = useRef(false);
    const editorRef = useRef(null);

    useEffect(() => {
        if (hasRun.current) return;
        hasRun.current = true;

        (async () => {
            await initStrudel({ editorRootEl: editorRef.current });
            Proc();
        })();
    }, []);

    return (
        <div className="card h-100">
            <div className="card-header fw-semibold">Editor / Output</div>
            <div className="card-body">
                <div id="editor" ref={editorRef} />
                <div id="output" />
            </div>
        </div>
    );
}
