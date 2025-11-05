import { FaCircleStop } from "react-icons/fa6";

export function Stop(props){
    return (
        <div>
            <button id={props.id} className="flex p-1"  onClick={props.handleStop}> 
                <FaCircleStop className="mx-1 self-center text-yellow-500"/>
                <div className="mx-1 text-yellow-500 font-bold"> Stop </div>
            </button>
        </div>
    );
}



