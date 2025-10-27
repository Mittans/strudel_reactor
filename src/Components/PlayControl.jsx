
function PlayControl() {
    return (
        <> {/* <> called React fragment, empty tags lets group multiple elements without having to use div */}



            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">SetCPM</span>
                <input type="text" class="form-control" id="cpm_text_input" placeholder="120" aria-label="120" aria-describedby="cpm_label" />

            </div>

            <label for="volume" class="form-label">Volume Slider</label>
            <input type="range" className="form-range" min="0" max="1" step="0.05" id="volume_range"></input>


            <div className="form-check">
                <input class="form-check-input" type="checkbox" value="" id="s1" />
                <label class="form-check-label" for="s1">
                    s1
                </label>
            </div>


            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="d1" />
                <label class="form-check-label" for="d1">
                    d1
                </label>
            </div>

            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="d2" />
                <label class="form-check-label" for="d2">
                    d2
                </label>
            </div>





        </>
    );
}
export default PlayControl;

