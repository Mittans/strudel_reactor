

function DJControls() {
    //let VOLUME = document.getElementById('volume_range').value;

    {/* how do i get volume and CPM to change?? */}
    return (
        <>
            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">SetCPM</span>
                
                {/* what is the difference between a placeholder and a defaultValue? */}
                <input type="text" className="form-control" id="cpm_text_input" placeholder="120" defaultValue="120" aria-label="cpm" aria-describedby="cpm_label"/>
            </div>

            {/* TODO: this does nothing!
            * it should show a numerical display next to the bar (and it should also, you know, work!) 
            */}
            <label htmlFor="volume_range" className="form-label">Volume</label>
            <input type="range" className="form-range" min="0" max="1" step="0.01" defaultValue="0.5" id="volume_range"/>
            
            <p>aaaa</p>
            {/* TODO: this does nothing! */}
            <div className="form-check">
                <input className="form-check-input" type="checkBox" name="aa" value="" id="checkBox1" defaultChecked /> {/*onChange={ProcAndPlay} */}
                <label className="form-check-label" htmlFor="checkBox1">
                    check1: a {/* p1 ON */}
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="checkBox" name="bb" value="" id="checkBox2"  /> {/*onChange={ProcAndPlay} */}
                <label className="form-check-label" htmlFor="checkBox2">
                    check2: a {/* p1 HUSH */}
                </label>
            </div>
        </>
    )
}

export default DJControls;