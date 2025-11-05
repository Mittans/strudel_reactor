import { FaRecycle } from "react-icons/fa";

export function Process(props){
    return (
        <div>
            <button id={props.id} className="flex p-1" onClick={props.handleProc}>
                <FaRecycle  className="mx-1 self-center text-yellow-500" />
                <div className="mx-1 text-yellow-500 font-bold">Preprocess</div>
            </button>
        </div>
    );
}