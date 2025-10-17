function Preprocess(){
    return (
        <>
            <div style={{ maxHeight: '80vh', overflowY: 'auto'}}>
              <label htmlFor="proc" className="form-label">Text to Preprocess:</label>
              <textarea className="form-control" rows="15" id="proc" ></textarea>
            </div>
        </>
    )
}

export default Preprocess