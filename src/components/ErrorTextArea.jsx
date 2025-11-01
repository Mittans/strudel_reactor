
function ErrorTextArea({ errorText, setErrorText }) {

    
    return (
        <>
            <textarea className="form-control errorTextBox" rows="10" readOnly={true} style={{ resize: 'none', display: 'none'}} value={"Error : "+errorText} id="err" ></textarea>
        </>
    )
}

export default ErrorTextArea;
