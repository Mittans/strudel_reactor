
function PreprocessTextArea({ songText, setSongText }) {
    return (
        <>
            <textarea className="form-control editor" rows="15" value={songText} onChange={(e) => {
                console.log("textarea detected a change");
                setSongText(e.target.value);
            }} style={{ resize: 'none', paddingLeft:'14px' }} id="proc" >
            </textarea>
        </>
    )
}

export default PreprocessTextArea;