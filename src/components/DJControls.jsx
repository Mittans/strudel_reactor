function DJControls() {
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">setCPM</span>

                <input type="text" className="form-control" id="cpm_text_input" placeholder="120" aria-label="Username" aria-describedby="cpm_label" />
            </div>

            {/* Volume */}
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" />


            {/* CheckBox for select instruments */}
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="s1" />
                <label class="form-check-label" htmlFor="s1">
                        s1
                    </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="d1" />
                <label class="form-check-label" htmlFor="d1">
                        d1
                    </label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="d1" />
                <label class="form-check-label" htmlFor="d2">
                        d2
                    </label>
            </div>
      </>
  );
}

export default DJControls;