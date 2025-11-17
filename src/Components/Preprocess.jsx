function Preprocess({ defaultValue, onChange }) {
    return (
        <>
            <label for="proc" className="form-label text-light"> Text to preprocess: </label>

            <textarea
                className="form-control transparent-textarea"
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