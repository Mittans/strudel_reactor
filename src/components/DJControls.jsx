function DJControls({ cpmValue, onCpmChange, volume, onVolumeChange }) {
    return (
        <>

        
         <label htmlFor="cpm_range" className="form-label">CPM: {cpmValue}</label>
      <input id="cpm_range" type="range"className="form-range"min="10"max="300"step="1"value={cpmValue} onChange={onCpmChange}/>
     {/* <div className="input-group mb-3">
        <span className="input-group-text" id="cpm_label">setCPM</span>
     <input type="number" className="form-control" min="1" max="1000" value={cpmValue} onChange={onCpmChange} aria-describedby="cpm_label"/>
    </div> */}
    
        <label htmlFor="volume_range" className="form-label">Volume</label>
        <input type="range" className="form-range" min="0" max="1" step="0.01" onMouseUp={onVolumeChange}  id="volume_range"></input>

    <div className="form-check">


</div>
        
        </>
    );

}

export default DJControls;