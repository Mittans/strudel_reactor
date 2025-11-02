
function CPMInput({ cpm, setCPM, onHandleCPM, theme }) {
    return (
        <div className="input-group mb-4">
            <span className="input-group-text menu_label_subject" id="cpm_label">CPM</span>
            <input type="number" className="form-control menu_label_value p-2 bg-background text-foreground border-foreground" id="cpm_text_input" placeholder="120" min="0" defaultValue="120" 
            aria-label="cpm" aria-describedby="cpm_label menu_label_value" value={cpm} onChange={(e) => {
                setCPM(e.target.value);
                onHandleCPM(e);
            }} />
        </div>
    )
}

export default CPMInput;