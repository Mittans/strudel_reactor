function TextPreprocessor({ defaultText }) {
  return (
    <>
      <div className="col-md-12" style={{ maxHeight: '90vh', overflowY: 'auto' }}>
        <label htmlFor="proc" className="form-label">Text to preprocess:</label>
        <textarea className="form-control" rows="15" id="proc" defaultValue={defaultText}></textarea>
      </div>
    </>
  );
}

export default TextPreprocessor;