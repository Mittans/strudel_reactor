function PreprocessTextArea({ defaultValue, onChange }) {
  return (
      <>
          <label hidden></label>
          <textarea className="form-control" rows="21" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
      </>
  );
}

export default PreprocessTextArea;