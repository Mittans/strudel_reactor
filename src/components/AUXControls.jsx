function AUX_Controls() {
  return (
    <>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">
          Set CPM
        </span>
        <input
          type="text"
          className="form-control"
          placeholder="120"
          id="cpm_text_input"
          aria-label="cpm"
          aria-describedby="cpm_label"
        />
      </div>

      <label for="volume_range" className="form-label">
        Volume
      </label>

      <input
        type="range"
        className="form-range"
        min="0"
        max="1"
        step="0.01"
        id="volume_range"
      />

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="s1"
        />
        <label className="form-check-label" for="s1">
          s1
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="d1"
        />
        <label className="form-check-label" for="d1">
          d1
        </label>
      </div>

      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="d2"
        />
        <label className="form-check-label" for="d2">
          d2
        </label>
      </div>
    </>
  );
}

export default AUX_Controls;
