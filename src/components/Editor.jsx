import { useEffect } from 'react';
import { stranger_tune } from '../tunes';

export default function Editor() {
    useEffect(() => {
        const el = document.getElementById('proc');
        if (el && !el.value) el.value = stranger_tune;
    }, []);

    return (
        <div className="card h-100">
            <div className="card-header fw-semibold">Text to preprocess</div>
            <div className="card-body">
                <textarea className="form-control font-monospace" rows={15} id="proc" />
            </div>
        </div>
    );
}
