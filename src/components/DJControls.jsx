function DJControls() {
    return (
        <>
     <div className="input-group mb-3">
        <span className="input-group-text" id="cpm_label">setCPM</span>
     <input type="text" className="form-control" placeholder="120" aria-label="Username" aria-describedby="cpm_label"/>

        
    </div>
    
        <label for="volume_range" className="form-label">Volume</label>
        <input type="range" className="form-range" min="0" max="1" step="0.01" id="volume_range"></input>

        <div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="checkDefault"/>
  <label className="form-check-label" for="s1">
    s1
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="checkDefault" />
  <label className="form-check-label" for="d1">
    d1
  </label>
</div>
<div className="form-check">
  <input className="form-check-input" type="checkbox" value="" id="checkDefault" />
  <label className="form-check-label" for="d2">
    d2
  </label>
</div>
        
        </>
    );

}

export default DJControls;