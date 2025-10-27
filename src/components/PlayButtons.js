import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCircleStop } from "react-icons/fa6";
import { IoMusicalNotes } from "react-icons/io5";

function PlayButtons(){
  return (
      <div className="card bg-dark text-light border-0 rounded-4 p-4">
        <div className="d-flex justify-content-between align-items-center">
          <FaRegCircleStop className="control-icon" />
          <FaRegCirclePlay className="control-icon" />
          <span className="status-pill"><IoMusicalNotes /> Live</span>
        </div>
      </div>
  )
}
export default PlayButtons;
