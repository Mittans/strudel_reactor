function ProcessCode( {songText} ) {

    let instruments = []
    const songTextLines = songText.split('\n');

    let cpmSpecified = false;

    //iterate through songTextLines
    //check for instruments and add it to list
    
    //iterate through instruments
    //display related settings

    if (songText!= null && songText.includes("setcpm(")) {
            cpmSpecified = true;
        }

    if (cpmSpecified){
        return (
            <div class="input-group mb-3">
                <span class="input-group-text bg-secondary border-secondary text-light" id="setCpmLabel">Set CPM</span>
                <input type="text" class="form-control bg-light border-secondary" aria-describedby="setCpmLabel"/>
            </div>
        );
    }
}
export default ProcessCode