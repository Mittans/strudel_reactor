function ProcessControls({handlePreprocess, handleProcPlay}) {
    return (
        <>
            <button id="process" className="btn btn-outline-primary" onClick={handlePreprocess}>Preprocess</button>
            <button id="process_play" className="btn btn-outline-primary" onClick={handleProcPlay}>Proc & Play</button>
        </>
    )
}

export default ProcessControls;