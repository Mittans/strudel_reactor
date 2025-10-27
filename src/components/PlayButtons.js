import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCircleStop } from "react-icons/fa6";
import { IoMusicalNotes } from "react-icons/io5";

function PlayButtons(){
  return (
      <div className="card bg-dark text-light border-0 rounded-4 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <button className="icon-btn" id="stop">
            <FaRegCircleStop className="control-icon" />
          </button>
          <button className="icon-btn" id="play">
            <FaRegCirclePlay className="control-icon" />
          </button>
          <span className="status-pill"><IoMusicalNotes /> Live</span>
        </div>
      </div>
  )
}
export default PlayButtons;
