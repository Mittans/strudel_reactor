import VolumeSlider from './VolumeSlider';
import { useState } from 'react';

function AUXControls({ onToggleChange, onBpmChange }) { 
  // Sets default as all instruments "On"
  const [toggles, setToggles] = useState({
    Baseline: true,
    MainArp: true,
    Drums: true,
    Drums2: true,
  });

  // BPM state with default value of 140
  const [bpm, setBpm] = useState(140);

  // Handles individual instrument toggle change
  const handleCheck = (e) => {
    const { id, checked } = e.target; // id = instrument name, checked = new state (boolean)
    const updated = { ...toggles, [id]: checked }; // creates a "copied" toggles object, setting instrument as id and checked as state (true/false)
    setToggles(updated); // Re-renders UI

    // Update to new changes
    if (onToggleChange) {
      onToggleChange(updated);
    }
  };

  // Handles BPM input change
  const handleBpmChange = (e) => {
    const value = e.target.value;
    // Only allow numbers and limit from 1 to 300
    if (value === '' || (Number(value) >= 1 && Number(value) <= 300)) {
      setBpm(value);
      if (onBpmChange && value !== '') {
        onBpmChange(Number(value));
      }
    }
  };

  // Mute all
  const handleMuteAll = () => {
    const allMuted = {
      Baseline: false,
      MainArp: false,
      Drums: false,
      Drums2: false,
    };

    setToggles(allMuted);
    // Update to new changes
    if (onToggleChange) {
      onToggleChange(allMuted);
    }
  };

  // Unmute all
  const handleUnmuteAll = () => {
    const allUnmuted = {
      Baseline: true,
      MainArp: true,
      Drums: true,
      Drums2: true,
    };
    setToggles(allUnmuted);

    // Update changes
    if (onToggleChange) {
      onToggleChange(allUnmuted);
    }
  };

  // Counts how many instruments are active
  const activeCount = Object.values(toggles).filter(Boolean).length;

  // Checks if all instruments are muted
  const allMuted = activeCount === 0;

  const handleToggleAll = () => {
    if (allMuted) { // If all muted, unmute all
      handleUnmuteAll(); 
    } else { // Mute all
      handleMuteAll();
    }
  };

  return (
    <>
      <div className="card border-0 shadow-sm">
        <div className='card-header bg-white pt-3'>
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="text-muted text-uppercase mb-3 mt-2" style={{ fontSize: '1rem' }}>Instruments</h6>
            <span className='badge bg-light text-dark'>
              {activeCount} / 4
            </span>
          </div>
        </div>
        
        <div className="px-3 mt-2">
          <VolumeSlider />
          
          {/* BPM Input */}
          <div className="mt-3 mb-2">
            <label htmlFor="bpmInput" className="form-label text-muted small mb-1">
              BPM (Beats Per Minute)
            </label>
            <div className="input-group input-group-sm">
              <input
                type="number"
                className="form-control"
                id="bpmInput"
                value={bpm}
                onChange={handleBpmChange}
                min="1"
                max="300"
                placeholder="140"
              />
              <span className="input-group-text">BPM</span>
            </div>
          </div>
        </div>

        <div className="card-body p-3">
          <div className='d-grid gap-2 mb-3'>
            <button
              className={`btn btn-sm ${allMuted ? 'btn-success' : 'btn-danger'}`}
              onClick={handleToggleAll}
            >
              <i className={`bi ${allMuted ? 'bi-volume-up-fill' : 'bi-volume-mute-fill'} me-1`}></i>
              {allMuted ? 'Unmute All' : 'Mute All'}
            </button>
          </div>

          <hr className="my-3" />

          <div className="list-group list-group-flush">
            {["Baseline", "MainArp", "Drums", "Drums2"].map((id) => (
              <div 
                key={id}
                className="list-group-item d-flex justify-content-between align-items-center px-0 border-0 py-2"
              >
                <div className="form-check form-switch mb-0">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={id}
                    checked={toggles[id]}
                    onChange={handleCheck}
                    style={{ cursor: 'pointer', width: '3em', height: '1.5em' }}
                  />
                  <label
                    className="form-check-label ms-2"
                    htmlFor={id}
                    style={{ cursor: 'pointer', fontWeight: '500' }}
                  >
                    {id}
                  </label>
                </div>
                <span className={`badge ${toggles[id] ? 'bg-success' : 'bg-secondary'}`}>
                  {toggles[id] ? 'ON' : 'OFF'}
                </span>

              </div>
              
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AUXControls;