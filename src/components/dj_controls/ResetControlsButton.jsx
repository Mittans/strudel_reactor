
function ResetControlsButton ({ onHandleResetControls}) {
    return (
        <>
            <div className="container">
                <button className="btn input-group- form-control" style={{ textAlign: "center" }} id="controls_reset" onClick={onHandleResetControls}>Restore Default Settings</button>
            </div>
        </>
    )
}

export default ResetControlsButton;