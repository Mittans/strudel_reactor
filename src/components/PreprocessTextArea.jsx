function PreprocessTextArea({ defaultValue, onChange }) {
    return (
        <div className="col-md-8" style={{ maxHeight: '50vh', overflowY: 'auto' }}>
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
            <textarea className="form-control" defaultValue={defaultValue} onChange={onChange} rows="15" id="proc" ></textarea>
        </div>
    )
}
export default PreprocessTextArea