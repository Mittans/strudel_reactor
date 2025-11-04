import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { useEffect } from 'react';
import AppNavBar from './components/AppNavBar';
import TabbedTop from './components/TabbedTop';
import TransportControls from './components/TransportControls';
import PreprocControls from './components/controls/PreprocControls';
import { SetupButtons, Proc } from './lib/preprocess';

export default function App() {
    useEffect(() => {
        SetupButtons();
        Proc(); // ensure REPL has initial text
    }, []);

    return (
        <div className="app-viewport d-flex flex-column">
            <AppNavBar />

            {/* TOP HALF — tabs: Text / Code / Graph */}
            <div className="top-pane container-fluid py-2">
                <TabbedTop />
            </div>

            {/* BOTTOM HALF — transport + controls */}
            <div className="bottom-pane container-fluid py-2">
                <div className="d-flex flex-column gap-3 h-100">
                    <TransportControls />
                    <PreprocControls />
                </div>
            </div>
        </div>
    );
}
