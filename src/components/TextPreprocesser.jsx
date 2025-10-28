function TextPreprocessor({ defaultText, onchange }) {
  return (
    <>
      <div className="col-md-12">
        <textarea className="form-control" rows="15" id="proc" defaultValue={defaultText} onChange={onchange}></textarea>
      </div>
    </>
  );
}

export default TextPreprocessor;