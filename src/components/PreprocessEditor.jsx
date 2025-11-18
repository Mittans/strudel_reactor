import '../Buttons.css';

// This small component shows the text editor where the user
// can type or paste Strudel code before it gets processed.
function PreprocessEditor({ defaultValue, onChange }) {
	return (
		<>
			{/* Label for clarity – tells the user what this box is for */}
			<label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>

			{/* Main text area where the Strudel code lives.
			    - defaultValue loads the initial tune
			    - onChange sends updates back to the parent */}
			<textarea className="form-control" rows="15" defaultValue={defaultValue} onChange={onChange} id="proc"></textarea>
		</>
	);
}

export default PreprocessEditor;