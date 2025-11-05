function InstrumentToggles({ checkedInstruments, onChange }) {
    const handleChange = (event) => {
        const { id, checked } = event.target;
        onChange(id, checked);
    };

  return (
      <>
          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="bassline" checked={checkedInstruments.bassline} onChange={handleChange} />
              <label className="form-check-label" htmlFor="bassline">
                  bassline
              </label>
          </div>
          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="main_arp" checked={checkedInstruments.main_arp} onChange={handleChange} />
              <label className="form-check-label" htmlFor="main_arp">
                  main_arp
              </label>
          </div>
          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="drums" checked={checkedInstruments.drums} onChange={handleChange} />
              <label className="form-check-label" htmlFor="drums">
                  drums
              </label>
          </div>
          <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="drums2" checked={checkedInstruments.drums2} onChange={handleChange} />
              <label className="form-check-label" htmlFor="drums2">
                  drums2
              </label>
          </div>
      </>
  );
}

export default InstrumentToggles;