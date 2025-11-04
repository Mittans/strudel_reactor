function ControlsSection() {
  return (
      <>
          <div className="input-group mb-3">
              <span className="input-group-text" id="cps_label">Set CPS</span>
              <input type="text" className="form-control" id="cpm_text_input" placeholder="CPS (cycles per second) e.g. 140" aria-label="cps" aria-describedby="cps_label" />
          </div>

          <label htmlFor="volume_range" className="form-label">Volume</label>
          <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range" />

          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="baseline" />
              <label className="form-check-label" htmlFor="baseline">
                  baseline
              </label>
          </div>
          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="main_arp" />
              <label className="form-check-label" htmlFor="main_arp">
                  main_arp
              </label>
          </div>
          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="drums" />
              <label className="form-check-label" htmlFor="drums">
                  drums
              </label>
          </div>
          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="drums2" />
              <label className="form-check-label" htmlFor="drums2">
                  drums2
              </label>
          </div>
      </>
  );
}

export default ControlsSection;