import "./ProcButtons.css";
// this file is responsible for the "proc" and "proc and play" feature, here the procbuttons take the onpreprocess and onprocandplay features from
// app.js and uses it in the button onClick to process the songText and evaluate strudel code when we do proc&play or just put 
// the code in the repl when we do preprocess. This component is simple but useful if we want to make live changes.
function ProcButtons({ onPreprocess, onProcAndPlay, songText }) {
    return (
        <>
            <div className="btn-group" id="proc-buttons" role="group" aria-label="Basic mixed styles example">
                <button id="process" className="btn btn-outline-primary" onClick={() => onPreprocess(songText)}>🔁</button>
                <button id="process_play" className="btn btn-outline-primary" onClick={() => onProcAndPlay(songText)}>🔀</button>
            </div>
        </>
    )
}


export default ProcButtons