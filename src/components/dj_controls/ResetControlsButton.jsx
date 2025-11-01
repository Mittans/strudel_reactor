
function ResetControlsButton ({ onHandleResetControls}) {
    return (
        <>
            <div className="container-flex">
                <button className="btn input-group-text form-control" style={{ textAlign: "center", backgroundColor: '#22222259' }} id="controls_reset" onClick={onHandleResetControls}>Restore Default Settings</button>
            </div>
        </>
    )
}

export default ResetControlsButton;