import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect } from 'react';
import AppNavBar from './components/AppNavBar';
import TabbedTop from './components/TabbedTop';
import TransportControls from './components/TransportControls';
import PreprocControls from './components/controls/PreprocControls';
import { SetupButtons, Proc } from './lib/preprocess';

export default function App() {
    useEffect(() => {
        SetupButtons();
        Proc();
    }, []);

    return React.createElement(
        'div',
        { className: 'app-viewport d-flex flex-column' },
        React.createElement(AppNavBar, null),
        React.createElement('div', { className: 'top-pane container-fluid py-2' },
            React.createElement(TabbedTop, null)
        ),

        React.createElement('div', { className: 'bottom-pane container-fluid py-2' },
            React.createElement(
                'div',
                { className: 'd-flex flex-column gap-3 h-100' },
                React.createElement(TransportControls, null),
                React.createElement(PreprocControls, null)
            )
        )
    );
}
