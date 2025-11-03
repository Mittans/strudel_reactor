function ControlsSection() {
  return (
      <>
          <div className="input-group mb-3">
              <span className="input-group-text" id="cpm_label">Set CPM</span>
              <input type="text" className="form-control" id="cpm_text_input" placeholder="CPM (cycles per minute) e.g. 120" aria-label="cpm" aria-describedby="cpm_label" />
          </div>

          <label for="volume_range" className="form-label">Volume</label>
          <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" />

          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="baseline" />
              <label className="form-check-label" for="baseline">
                  baseline
              </label>
          </div>
          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="main_arp" />
              <label className="form-check-label" for="main_arp">
                  main_arp
              </label>
          </div>
          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="drums" />
              <label className="form-check-label" for="drums">
                  drums
              </label>
          </div>
          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="drums2" />
              <label className="form-check-label" for="drums2">
                  drums2
              </label>
          </div>
      </>
  );
}

export default ControlsSection;