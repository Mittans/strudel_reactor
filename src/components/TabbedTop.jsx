import { useState } from 'react';
import Editor from './Editor';
import CodePanel from './CodePanel';
import GraphPanel from './GraphPanel';

export default function TabbedTop() {
    const [tab, setTab] = useState('text'); // 'text' | 'code' | 'graph'

    return (
        <div className="pane pane-top">
            <ul className="nav nav-tabs mb-2" role="tablist">
                <li className="nav-item" role="presentation">
                    <button
                        type="button"
                        className={`nav-link ${tab === 'text' ? 'active' : ''}`}
                        onClick={() => setTab('text')}
                        role="tab"
                        aria-selected={tab === 'text'}
                    >
                        Text
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        type="button"
                        className={`nav-link ${tab === 'code' ? 'active' : ''}`}
                        onClick={() => setTab('code')}
                        role="tab"
                        aria-selected={tab === 'code'}
                    >
                        Code
                    </button>
                </li>
                <li className="nav-item" role="presentation">
                    <button
                        type="button"
                        className={`nav-link ${tab === 'graph' ? 'active' : ''}`}
                        onClick={() => setTab('graph')}
                        role="tab"
                        aria-selected={tab === 'graph'}
                    >
                        Graph
                    </button>
                </li>
            </ul>

            <div className="pane-content">
                <div className="h-100" style={{ display: tab === 'text' ? 'block' : 'none' }}>
                    <Editor />
                </div>
                <div className="h-100" style={{ display: tab === 'code' ? 'block' : 'none' }}>
                    <CodePanel />
                </div>
                <div className="h-100" style={{ display: tab === 'graph' ? 'block' : 'none' }}>
                    <GraphPanel />
                </div>
            </div>
        </div>
    );
}
