import { strudelActions } from "../strudel/strudelSetup";
import { Proc } from "../strudel/procLogic";

export default function ControlButtons() {
  const handleProcessAndPlay = () => {
    // Process the text
    Proc();

    // Play
    strudelActions.evaluate();
  };

  return (
    <div className="d-grid gap-2">
      <h4>Controls</h4>
      <button
        id="play"
        className="btn btn-success"
        onClick={strudelActions.evaluate}
      >
        Play
      </button>
      <button
        id="stop"
        className="btn btn-danger"
        onClick={strudelActions.stop}
      >
        Stop
      </button>
      <button id="process" className="btn btn-info" onClick={Proc}>
        Process Text
      </button>
      <button
        id="process_play"
        className="btn btn-warning"
        onClick={handleProcessAndPlay}
      >
        Process & Play
      </button>
    </div>
  );
}
