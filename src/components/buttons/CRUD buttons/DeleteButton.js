import { RiDeleteBin7Fill } from "react-icons/ri";

export function Delete(props){
    return (
        <div>
            <button id={props.id} className="flex" onClick={props.handleDelete} title="Delete song"> 
                <RiDeleteBin7Fill className="mx-1 text-[25px] self-center text-red-500 hover:text-red-700"/>
            </button>
        </div>
    );
}