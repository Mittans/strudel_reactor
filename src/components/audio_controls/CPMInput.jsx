
function CPMInput({ cpm, setCPM, onHandleCPM }) {
    return (
        <div className="input-group mb-4">
            <span className="input-group-text menu_label" id="cpm_label">CPM</span>
            <input type="number" className="form-control" id="cpm_text_input" placeholder="120" min="0" defaultValue="120" 
            aria-label="cpm" aria-describedby="cpm_label" value={cpm} onChange={(e) => {
                setCPM(e.target.value);
                onHandleCPM(e);
            }} />
        </div>
    )
}

export default CPMInput;