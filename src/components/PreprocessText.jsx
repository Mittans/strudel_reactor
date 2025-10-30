function PreprocessText({ defaultValue, onChange }) {
    return (
        <>   
            <label htmlFor="exampleFormControlTextarea1" className="form-label text-secondary py-3">Text to preprocess:</label>
            <textarea style={{ fontFamily: 'Lucida Console, monospace' }} className="form-control bg-dark text-light border-secondary" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
        </>
    );
}

export default PreprocessText