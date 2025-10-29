function TrackControls() {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="radio-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="p1"
            id="p1on"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="p1on">
            p1: ON
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="p1"
            id="p1hush"
          />
          <label className="form-check-label" htmlFor="p1hush">
            p1: HUSH
          </label>
        </div>
      </div>
      <div className="radio-group">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="p2"
            id="p2on"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="p2on">
            p2: ON
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="p2"
            id="p2hush"
          />
          <label className="form-check-label" htmlFor="p2hush">
            p2: HUSH
          </label>
        </div>
      </div>
    </div>
  );
}

export default TrackControls;
