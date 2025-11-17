import '../Buttons.css';
function ProcButtons({ onPreprocess, onProcPlay }) {
    return (
        <>
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                <button id="process" className="btn btn-outline-primary" onClick={onPreprocess}>Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary" onClick={onProcPlay}>Proc & Play</button>
            </div>
        </>
        
    );
}

export default ProcButtons;