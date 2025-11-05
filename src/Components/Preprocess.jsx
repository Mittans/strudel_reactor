function Preprocess({ defaultValue, onChange }) {
    return (
        <>
            <label htmlFor="proc" className="form-label" style={{ backgroundColor: 'transparent', color: 'white', opacity: 1 }}>
                Text to preprocess:</label>
            <textarea
                className="form-control transparent-bg"
                rows="15"
                value={defaultValue}
                onChange={onChange}
                id="proc"
                style={{
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'white',
                    opacity: 1
                }}
            ></textarea>
        </>
    );
}
export default Preprocess;