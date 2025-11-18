import '../Buttons.css';

// Renders the two preprocessing buttons:
// - "Preprocess": loads the raw text into the Strudel editor
// - "Proc & Play": preprocesses the text and immediately plays it
function ProcButtons({ onPreprocess, onProcPlay }) {
    return (
        <>
            {/* Button group keeps the two actions visually aligned */}
            <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                {/* Runs preprocessing only */}
                <button id="process" className="btn btn-outline-primary" onClick={onPreprocess}>Preprocess</button>

                {/* Runs preprocessing AND starts playback */}
                <button id="process_play" className="btn btn-outline-primary" onClick={onProcPlay}>Proc & Play</button>
            </div>
        </>
        
    );
}

export default ProcButtons;