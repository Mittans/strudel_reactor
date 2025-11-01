import './App.css';
import { useState, useRef, useEffect } from "react";

// import { registerSoundfonts } from '@strudel/soundfonts';
import { stranger_tune } from './tunes';
import StrudelPlayer from './components/StrudelPlayer';

let defaultTune = stranger_tune;

function App() {
    // this in App allows me to have one constant ref for both StrudelPlayer and StrudelSetup 
    //const strudelRef = useRef();
    return (
        <div>
            <StrudelPlayer 
            />
        </div >
    );


}

export default App;