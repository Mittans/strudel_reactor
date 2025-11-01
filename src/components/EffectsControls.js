function EffectsControls() {
  return (
    <div className="my-2">
      <div className="row row-cols-2 g-3">
        {/* Room Reverb */}
        <div className="col d-flex align-items-center justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="reverb"
            />
            <label className="form-check-label" htmlFor="reverb">
              Reverb
            </label>
          </div>
          <input
            type="number"
            className="form-control form-control-sm text-center"
            style={{ width: "60px" }}
            min="0"
            max="1"
            step="0.1"
            defaultValue="0.6"
          />
        </div>

        {/* Stereo Spread */}
        <div className="col d-flex align-items-center justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="spread"
            />
            <label className="form-check-label" htmlFor="spread">
              Stereo
            </label>
          </div>
          <input
            type="number"
            className="form-control form-control-sm text-center"
            style={{ width: "60px" }}
            defaultValue="1"
          />
        </div>

        {/* Low Pass Filter */}
        <div className="col d-flex align-items-center justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="filter"
            />
            <label className="form-check-label" htmlFor="filter">
              LPF
            </label>
          </div>
          <input
            type="number"
            className="form-control form-control-sm text-center"
            style={{ width: "60px" }}
            min="100"
            max="10000"
            step="100"
            defaultValue="500"
          />
        </div>

        {/* Distortion */}
        <div className="col d-flex align-items-center justify-content-between">
          <div className="form-check">
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="distortion"
            />
            <label className="form-check-label" htmlFor="distortion">
              Distortion
            </label>
          </div>
          <input
            type="number"
            className="form-control form-control-sm text-center"
            style={{ width: "60px" }}
            min="0"
            max="1"
            step="0.1"
            defaultValue="0.5"
          />
        </div>
      </div>
    </div>
  );
}

export default EffectsControls;
