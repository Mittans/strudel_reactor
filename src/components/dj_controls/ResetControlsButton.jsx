
function ResetControlsButton ({ onHandleResetControls}) {
    return (
        <>
            <div className="container-flex">
                <button className="btn input-group-text form-control" style={{ textAlign: "center" }} id="controls_reset" onClick={onHandleResetControls}>Restore Default Settings</button>
            </div>
        </>
    )
}

export default ResetControlsButton;