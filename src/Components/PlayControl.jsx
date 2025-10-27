
function PlayControl() {
    return (
        <> {/* <> called React fragment, empty tags lets group multiple elements without having to use div */}



            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">SetCPM</span>
                <input type="number" class="form-control" id="cpm_text_input" placeholder="120" aria-label="120" aria-describedby="cpm_label" min="0" max="500" step="10" />
            </div>


            <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="s1" />
                <label className="form-check-label" for="s1">
                    s1
                </label>
            </div>

            <div class="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d1" />
                <label className="form-check-label" for="d1">
                    d1
                </label>
            </div>

            <div class="form-check">
                <input className="form-check-input" type="checkbox" value="" id="d2" />
                <label className="form-check-label" for="d2">
                    d2
                </label>
            </div>



        </>
    );
}
export default PlayControl;

