function ProcButtons({ onProc }) {
    return (
        <>
            <div className="btn-group" role="group" aria-label="">
                <button id="process" className="btn btn-outline-primary" onClick={onProc}>Preprocess</button>
                {/*<button id="process_play" className="btn btn-outline-success">Proc & Play</button>*/}
            </div>
        </>
    );
}

export default ProcButtons;