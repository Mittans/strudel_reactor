import { RiMagicLine } from "react-icons/ri";
import { FaPlayCircle } from "react-icons/fa";

function ProcButtons({ onPreprocess, onProcAndPlay }) {
  return (
    <div className="card bg-dark text-light border-0 rounded-4 p-3">
      <div className="d-flex justify-content-between align-items-center">
        <button className="proc-btn" onClick={onPreprocess}>
          <RiMagicLine className="proc-icon" />
          <span className="ms-2">Preprocess</span>
        </button>

        <button className="proc-btn" onClick={onProcAndPlay}>
          <FaPlayCircle className="proc-icon" />
          <span className="ms-2">Proc & Play</span>
        </button>
      </div>
    </div>
  );
}
export default ProcButtons;
