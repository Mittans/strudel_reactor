import { FaSave } from "react-icons/fa";

export function Save(props){
    return (
        <div>
            <button id={props.id} className="flex" onClick={props.handleSave} title="Save song"> 
                <FaSave className="mx-1 text-[25px] self-center text-green-500 hover:text-green-700"/>
            </button>
        </div>
    );
}