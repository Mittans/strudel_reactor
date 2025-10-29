import { useState } from "react";

function TempoInput({cpm, setCpm}) {

  return (
    <div className="d-flex align-items-center gap-4">
        <label htmlFor="tempoInput" className="mb-0 text-white"><strong>Tempo (CPM)</strong></label>
        <input id="tempoInput" className="form-control" type="number" min="0" max="300" value={cpm} onChange={(e) => setCpm(e.target.value)} style={{ width: '120px' }}/>
    </div>
  );
}

export default TempoInput;