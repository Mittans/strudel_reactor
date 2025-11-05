import { FaDownload } from "react-icons/fa";

export function Load(props){
    return (
        <div>
            <button id={props.id} className="flex" onClick={props.handleLoad} title="Load song"> 
                <FaDownload className="mx-1 self-center text-[25px] text-orange-500 hover:text-orange-700"/>
            </button>
        </div>
    );
}