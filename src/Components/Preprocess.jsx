function Preprocess({ defaultValue, onChange }) {

    return (
        <>
            <label htmlFor="exampleFormControlTextarea1" className="form-label glass-card">Text to preprocess:</label>
            <textarea className="form-control" rows="15" value={defaultValue} onChange={onChange} id="proc" ></textarea>
        </>
    );

}
export default Preprocess;