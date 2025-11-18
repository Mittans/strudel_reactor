import "./PreprocessTextarea.css";

// This component is responsible for preprocesstextarea field which is used to put the songtext to
// play by preproc and preproc and play.It has the default value coming from app.js which is actually
// from tunes.js which we can change live and then play any other strudel song as well.
function PreprocessTextarea({ defaultValue, onChange }) {
    return (
        <>
            <label id="label" htmlFor="exampleFormControlTextarea1" className="form-label">🎶 Text to preprocess:</label>
            <textarea className="form-control" rows="9" defaultValue={defaultValue} onChange={onChange} id="proc"></textarea>
        </>
    );
}

export default PreprocessTextarea;