
function PreprocessTextArea({ defaultValue, onChange }) {
    return (
        <>
        
        {/* TODO: what is this label? */}
            {/* <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label> */}
            <textarea className="form-control" rows="15" defaultValue={defaultValue} style={{ resize: 'none' }} onBeforeInput={onChange} onChange={onChange} id="proc" ></textarea>
        </>
    )
}

export default PreprocessTextArea;