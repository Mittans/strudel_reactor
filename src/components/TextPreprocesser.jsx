function TextPreprocessor({ defaultText }) {
  return (
    <>
      <div className="col-md-12">
        <textarea className="form-control" rows="15" id="proc" defaultValue={defaultText}></textarea>
      </div>
    </>
  );
}

export default TextPreprocessor;