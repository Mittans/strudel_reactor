function ProcButtons() {
    return (
        <>
        {/* TODO: do these... do anything? check vid again */}
            <div className="btn-group" role="group" aria-label="Basic buttons">
                {/* CTRL+ENTER & CTRL+.  to stop if these break */}
                <button id="process" className="btn btn-outline-info">Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary">Proc & Play</button>
            </div>
        </>
    )
}

export default ProcButtons;