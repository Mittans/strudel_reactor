
function ResetControlsButton ({ onHandleResetControls}) {
    return (
        <>
            <div className="container-flex">
                <button className="btn input-group-text form-control" style={{ textAlign: "center", backgroundColor: 'silver' }} id="controls_reset" onClick={onHandleResetControls}>restore default settings</button>
            </div>
        </>
    )
}

export default ResetControlsButton;