import { BrowserRouter, Routes, Route } from "react-router-dom";
import StrudelDemo from "./Pages/StrudelDemo";
import "./Styles/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App(isPlaying) {
    return (
        <BrowserRouter>

            <nav className="navbar navbar-dark bg-dark px-3 border-bottom border-primary">
                <div className="container-fluid">
                    <span className="navbar-brand mb-0 h1 d-flex align-items-center">
                        <i className="bi bi-music-note-beamed me-2 text-primary"></i>
                        <span className="text-light">Strudel Studio</span>
                    </span>


                    <span className="navbar-text text-light small">
                        <i className="bi bi-circle-fill text-success me-1"></i>
                        Online
                    </span>
                </div>
            </nav>

            <main className="studio-bg min-vh-100">
                <div className="studio-container">
                    <Routes>
                        <Route path="/" element={<StrudelDemo />} />
                        <Route path="/strudeldemo" element={<StrudelDemo />} />
                    </Routes>
                </div>
            </main>
        </BrowserRouter>
    );
}