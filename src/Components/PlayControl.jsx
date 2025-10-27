
function PlayControl() {
    return (
        <> {/* <> called React fragment, empty tags lets group multiple elements without having to use div */}


            <div className="input-group mb-3">
                <span className="input-group-text" id="cpm_label">SetCPM</span>
                <input type="text" class="form-control" placeholder="120" aria-label="120" aria-describedby="cpm_label" />
            </div >


        </>
    );
}
export default PlayControl;
