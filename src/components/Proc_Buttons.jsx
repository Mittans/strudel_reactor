function Proc_Buttons() {
    return (
        <>
            <div className="btn-group" role="group" aria-label="Proc Controls">
                <button id="process" className="btn btn-outline-primary">Preprocess</button>
                <button id="process_play" className="btn btn-outline-primary">Proc & Play</button>
            </div>
        </>
    );
}

export default Proc_Buttons;