
function ErrorTextArea({ defaultValue, onChange }) {
    return (
        <>
            <textarea className="form-control" rows="10" readOnly={true} defaultValue={"Error : "+defaultValue} onChange={onChange} id="err" ></textarea>
        </>
    )
}

export default ErrorTextArea;
