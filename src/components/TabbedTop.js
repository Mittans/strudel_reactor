import React, { useState } from 'react';
import Editor from './Editor';
import CodePanel from './CodePanel';
import GraphPanel from './GraphPanel';

export default function TabbedTop() {
    const [tab, setTab] = useState('text'); 

    const tabBtn = (id, label) =>
        React.createElement(
            'button',
            {
                type: 'button',
                className: 'nav-link ' + (tab === id ? 'active' : ''),
                onClick: () => setTab(id),
                role: 'tab',
                'aria-selected': tab === id ? 'true' : 'false',
            },
            label
        );

    const tabsBar = React.createElement(
        'ul',
        { className: 'nav nav-tabs mb-2', role: 'tablist' },
        React.createElement('li', { className: 'nav-item', role: 'presentation' }, tabBtn('text', 'Text')),
        React.createElement('li', { className: 'nav-item', role: 'presentation' }, tabBtn('code', 'Code')),
        React.createElement('li', { className: 'nav-item', role: 'presentation' }, tabBtn('graph', 'Graph'))
    );

    const textView = React.createElement(
        'div',
        { className: 'h-100', style: { display: tab === 'text' ? 'block' : 'none' } },
        React.createElement(Editor, null)
    );
    const codeView = React.createElement(
        'div',
        { className: 'h-100', style: { display: tab === 'code' ? 'block' : 'none' } },
        React.createElement(CodePanel, null)
    );
    const graphView = React.createElement(
        'div',
        { className: 'h-100', style: { display: tab === 'graph' ? 'block' : 'none' } },
        React.createElement(GraphPanel, null)
    );

    return React.createElement(
        'div',
        { className: 'pane pane-top' },
        tabsBar,
        React.createElement('div', { className: 'pane-content' }, textView, codeView, graphView)
    );
}
