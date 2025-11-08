import HighPassFilter from "./HighPassFilter";
import LowPassFilter from "./LowPassFilter";
import MediumPassFilter from "./MediumPassFilter";
import PlayButtons from "./PlayButtons";
import ProcessingButtons from "./ProcessingButtons";
import Track from "./Track";
import VolumeControl from "./VolumeControl";

function Navigation({
    globalEditor,
    Proc,
    Tracks,
    setLowPassState,
    setHighPassState,
    setMediumPassState,
    Volume,
    MuteState,
    setMuteState,
}) {
    return (
        <div>
            <nav className="row w-100 " style={{ maxHeight: "100vh" }}>
                <ProcessingButtons globalEditor={globalEditor} Proc={Proc} />
                <br />
                <PlayButtons globalEditor={globalEditor} />
                <br />
                <h6 className="text-center">Volume Controls:</h6>
                <VolumeControl
                    Proc={Proc}
                    MuteState={MuteState}
                    setMuteState={setMuteState}
                    Volume={Volume}
                />
                <br />
                <h6 className="text-center">Track Volume Control:</h6>
                {Array.from(
                    { length: Tracks.length },
                    (_, i) => (
                        <Track key={Tracks[i]} trackName={Tracks[i]} Volume={Volume} />
                    ),
                    <br />
                )}
                <h6 className="text-center">Filters:</h6>
                <LowPassFilter setLowPassState={setLowPassState} Proc={Proc} />
                <br />
                <MediumPassFilter setMediumPassState={setMediumPassState} Proc={Proc} />
                <br />
                <HighPassFilter setHighPassState={setHighPassState} Proc={Proc} />
            </nav>
        </div>
    );
}

export default Navigation;
