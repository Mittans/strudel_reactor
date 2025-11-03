import '../css/Preprocess.css';

function Preprocess({ onChange, value }){

    const handleChange = (e) => {
        // setCode(e.target.value);
        onChange?.(e.target.value);
    };

    return (
        <>
            <div id='preProcContainer' style={{ maxHeight: '80vh', overflowY: 'auto', maxWidth: '100%'}}>
              <label  id='procLabel' htmlFor="proc" className="form-label fw-bold">Text to Preprocess:</label>
              <textarea className="form-control" rows="10" id="proc" value={value} onChange={handleChange} ></textarea>
            </div>
        </>
    )
}

export default Preprocess