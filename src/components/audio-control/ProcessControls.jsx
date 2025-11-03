function ProcessControls({ handlePreprocess, handleProcPlay }) {
    return (
        <>
            <div className="col-6">
                <button className="btn btn-primary btn-lg btn-proc w-100" onClick={handlePreprocess}>Preprocess</button>
            </div>
            <div className="col-6">
                <button className="btn btn-primary btn-lg btn-proc w-100" onClick={handleProcPlay}>Proc & Play</button>
            </div>
        </>
    );
}

export default ProcessControls;
