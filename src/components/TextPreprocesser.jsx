function TextPreprocessor({ defaultText }) {
  return (
    <>
      <div className="col-md-12">
        <label htmlFor="proc" className="form-label text-white">Text to preprocess:</label>
        <textarea className="form-control" rows="15" id="proc" defaultValue={defaultText}></textarea>
      </div>
    </>
  );
}

export default TextPreprocessor;