import { FaPlay } from "react-icons/fa";

export function Play(props){
    return (
        <div>
            <button id={props.id} className="flex p-1" onClick={props.handlePlay}> 
                <FaPlay className="mx-1 self-center text-yellow-500"></FaPlay>
                <div className="mx-1 font-bold text-yellow-500">Play</div>
            </button>
        </div>
    );
}