import { FaRegCirclePlay } from "react-icons/fa6";
import { FaRegCircleStop } from "react-icons/fa6";
import { IoMusicalNotes } from "react-icons/io5";

function PlayButtons({ onPlay, onStop }){
  return (
      <div className="card bg-dark text-light border-0 rounded-4 p-3 mt-3">
        <div className="d-flex justify-content-between align-items-center">
          <FaRegCircleStop className="control-icon" onClick={onStop}/>
          <FaRegCirclePlay className="control-icon" onClick={onPlay}/>
          <span className="status-pill"><IoMusicalNotes /> Live</span>
        </div>
      </div>
  )
}
export default PlayButtons;
