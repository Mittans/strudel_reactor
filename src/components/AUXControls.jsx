
import { useState } from 'react';
function AUXControls({ onToggleChange }) {
  const [toggles, setToggles] = useState({
    Baseline: true,
    MainArp: true,
    Drums: true,
    Drums2: true,
  });

  const handleCheck = (e) => {
    const { id, checked } = e.target;
    const updated = { ...toggles, [id]: checked };
    setToggles(updated);

    // Send updated toggles to parent (StrudelDemo)
    if (onToggleChange) {
      onToggleChange(updated);
    }
  };

  const handleMuteAll = () => {
    const allMuted = {
      Baseline: false,
      MainArp: false,
      Drums: false,
      Drums2: false,
    };
    setToggles(allMuted);
    
    if (onToggleChange) {
      onToggleChange(allMuted);
    }
  };

  const handleUnmuteAll = () => {
    const allUnmuted = {
      Baseline: true,
      MainArp: true,
      Drums: true,
      Drums2: true,
    };
    setToggles(allUnmuted);
    
    if (onToggleChange) {
      onToggleChange(allUnmuted);
    }
  };

  const activeCount = Object.values(toggles).filter(Boolean).length;
  const allMuted = activeCount === 0;

  const handleToggleAll = () => {
    if (allMuted) {
      handleUnmuteAll();
    } else {
      handleMuteAll();
    }
  };




  return (
    <>
      <div className="mb-3">
       <button 
          className={`btn btn-sm ${allMuted ? 'btn-success' : 'btn-danger'}`}
          onClick={handleToggleAll}
        >
          <i className={`bi ${allMuted ? 'bi-volume-up-fill' : 'bi-volume-mute-fill'} me-1`}></i>
          {allMuted ? 'Unmute All' : 'Mute All'}
        </button>
      </div>
      {["Baseline", "MainArp", "Drums", "Drums2"].map((id) => (
        <div className="form-check" key={id}>
          <input
            className="form-check-input"
            type="checkbox"
            id={id}
            checked={toggles[id]}
            onChange={handleCheck}
          />
          <label className="form-check-label" htmlFor={id}>
            {id}
          </label>
        </div>
      ))}
    </>
  );
}

export default AUXControls;

