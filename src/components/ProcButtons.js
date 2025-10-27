import { RiMagicLine } from "react-icons/ri";
import { FaPlayCircle } from "react-icons/fa";

function ProcButtons() {
  return (
    <div className="card bg-dark text-light border-0 rounded-4 p-4">
      <div className="d-flex justify-content-between align-items-center">
        <button id="process" className="proc-btn">
          <RiMagicLine className="proc-icon" />
          <span className="ms-2">Preprocess</span>
        </button>

        <button id="process_play" className="proc-btn">
          <FaPlayCircle className="proc-icon" />
          <span className="ms-2">Proc & Play</span>
        </button>
      </div>
    </div>
  );
}
export default ProcButtons;
