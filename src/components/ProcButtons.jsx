//import handleReset from '../App';

function ProcButtons( { onProc, onProcPlay } ) {
    return (
        <>
        {/* TODO: do these... do anything? check vid again */}
            <div className="btn-group " role="group" aria-label="Process buttons">
                {/* CTRL+ENTER & CTRL+.  to stop if these break */}
                
                <button id="process" className="btn btn-outline-info headerButtons" onClick={onProc}>Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary headerButtons" onClick={onProcPlay}>Proc & Play</button>
            </div>
        </>
    )
}

export default ProcButtons;