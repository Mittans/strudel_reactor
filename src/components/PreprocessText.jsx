function PreprocessText({ defaultValue, onChange }) {
    return (
        <div>   
            <textarea style={{ fontFamily: 'Lucida Console, monospace' }} className="form-control bg-dark text-light border-secondary rounded-top-0" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc" ></textarea>
        </div>
    );
}

export default PreprocessText