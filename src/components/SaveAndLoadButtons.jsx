function SaveAndLoadButtons({ MuteState, setMuteState }) {
    const saveState = () => {
        let State = {};
        let value = document.getElementById("proc").value;
        State["music"] = value;
        State["Mute"] = MuteState;
        State = JSON.stringify(State);
        const blob = new Blob([State], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "data.json";
        link.click();
        URL.revokeObjectURL(url);
    };

    const loadState = () => {
        let State = document.createElement("input");
        State.type = "file";
        State.accept = "application/json";
        State.onchange = (load) => {
            let file = load.target.files[0];
            let reader = new FileReader();
            reader.onload = (event) => {
                let result = event.target.result;
                let json = JSON.parse(result);
                if (json.music) {
                    document.getElementById("proc").value = json.music;
                }
                if (json.Mute) {
                    setMuteState(json.Mute);
                }
            };
            reader.readAsText(file);
        };
        State.click();
    };
    return (
        <div className="d-flex mb-3 pt-2">
            <div className="col-6 text-center pe-2">
                <button
                    id="save"
                    className="btn btn-outline-primary"
                    style={{ width: "97.5%" }}
                    onClick={() => saveState()}
                >
                    Save
                </button>
            </div>
            <div className="col-6 text-center">
                <button
                    id="load"
                    className="btn btn-outline-primary"
                    style={{ width: "97.5%" }}
                    onClick={() => loadState()}
                >
                    Load
                </button>
            </div>
        </div>
    );
}

export default SaveAndLoadButtons;
