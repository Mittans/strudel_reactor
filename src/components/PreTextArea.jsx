function PreTextArea({ defaultVal, onChange }) {
    return (
        <>
            <label htmlFor="exampleFormControlTextarea1" className="form-label text-light">Text to preprocess:</label>
            <textarea className="form-control bg-dark text-light" rows="15" defaultValue={defaultVal} onChange={onChange} id="proc" ></textarea>
        </>
    );
}

export default PreTextArea;