function TrackControls() {
  return (
    <div className="row row-cols-2 g-4">
      {/* Bassline */}
      <div className="col">
        <div className="mb-1 fw-semibold">Bassline</div>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="bassline"
              id="basslineOn"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="basslineOn">
              ON
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="bassline"
              id="basslineHush"
            />
            <label className="form-check-label" htmlFor="basslineHush">
              HUSH
            </label>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="col">
        <div className="mb-1 fw-semibold">Main</div>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="main"
              id="mainOn"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="mainOn">
              ON
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="main"
              id="mainHush"
            />
            <label className="form-check-label" htmlFor="mainHush">
              HUSH
            </label>
          </div>
        </div>
      </div>

      {/* Drums*/}
      <div className="col">
        <div className="mb-1 fw-semibold">Drums</div>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="drums"
              id="drumsOn"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="drumsOn">
              ON
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="drums"
              id="drumsHush"
            />
            <label className="form-check-label" htmlFor="drumsHush">
              HUSH
            </label>
          </div>
        </div>
      </div>

      {/* Drums 2 */}
      <div className="col">
        <div className="mb-1 fw-semibold">Drums 2</div>
        <div className="d-flex gap-3">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="drums2"
              id="drums2On"
              defaultChecked
            />
            <label className="form-check-label" htmlFor="drums2On">
              ON
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="drums2"
              id="drums2Hush"
            />
            <label className="form-check-label" htmlFor="drums2Hush">
              HUSH
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackControls;
