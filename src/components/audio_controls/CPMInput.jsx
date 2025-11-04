import base from '../BaseSettings';

function CPMInput({ cpm, setCPM, onHandleCPM }) {
    return (
        <div className="input-group mb-4">
            <span className="input-group-text menu_label_subject" id="cpm_label">CPM</span>
            <input type="number" className="form-control menu_label_value p-2 bg-background text-foreground border-foreground" id="cpm_text_input" 
            placeholder={base.DEFAULT_CPM} min="0" defaultValue={base.DEFAULT_CPM} 
            aria-label="cpm" aria-describedby="cpm_label menu_label_value" value={cpm} onChange={(e) => {
                setCPM(e.target.value);
                onHandleCPM(e);
            }} />
        </div>
    )
}

export default CPMInput;