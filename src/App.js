
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Strudel from "./Pages/Strudel";
import "./Styles/App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function App() {
    return (
        <BrowserRouter>
            <header className="p-3 border-bottom d-flex gap-3">
                <Link to="/" className="btn btn-outline-primary">Home</Link>
                <Link to="/strudel" className="btn btn-outline-secondary">Strudel Demo</Link>
            </header>

            <Routes>
                <Route path="/strudel" element={<Strudel />} />
            </Routes>
        </BrowserRouter>
    );
}