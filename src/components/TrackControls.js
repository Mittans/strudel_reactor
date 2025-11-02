function TrackControls({ tracks, onTrackChange }) {
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
              id="bassline-on"
              checked={tracks.bassline === 'ON'}
              onChange={() => onTrackChange('bassline', 'ON')}
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
              id="bassline-hush"
              checked={tracks.bassline === 'HUSH'}
              onChange={() => onTrackChange('bassline', 'HUSH')}
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
              id="main-on"
              checked={tracks.main_arp === 'ON'}
              onChange={() => onTrackChange('main_arp', 'ON')}
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
              id="main-hush"
              checked={tracks.main_arp === 'HUSH'}
              onChange={() => onTrackChange('main_arp', 'HUSH')}
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
              id="drums-on"
              checked={tracks.drums === 'ON'}
              onChange={() => onTrackChange('drums', 'ON')}
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
              id="drums-hush"
              checked={tracks.drums === 'HUSH'}
              onChange={() => onTrackChange('drums', 'HUSH')}
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
              id="drums2-on"
              checked={tracks.drums2 === 'ON'}
              onChange={() => onTrackChange('drums2', 'ON')}
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
              id="drums2-hush"
              checked={tracks.drums2 === 'HUSH'}
              onChange={() => onTrackChange('drums2', 'HUSH')}
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
