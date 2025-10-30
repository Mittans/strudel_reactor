
function ErrorTextArea({ defaultValue, onChange }) {
    return (
        <>
            <textarea className="form-control" rows="10" readOnly={true} style={{ resize: 'none' }} defaultValue={"Error : "+defaultValue} onChange={onChange} id="err" ></textarea>
        </>
    )
}

export default ErrorTextArea;
