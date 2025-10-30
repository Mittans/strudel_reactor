function AUX_Controls() {
  return (
    <>
      <div className="mb-3">
        <button className="btn btn-danger btn-sm me-2">
          Mute All
        </button>
        <button className="btn btn-success btn-sm">
          Unmute All
        </button>
      </div>
      {["Baseline", "MainArp", "Drums", "Drums2"].map((id) => (
        <div className="form-check" key={id}>
          <input
            className="form-check-input"
            type="checkbox"
            id={id}
          />
          <label className="form-check-label" htmlFor={id}>
            {id}
          </label>
        </div>
      ))}
    </>
  );
}

export default AUX_Controls;

