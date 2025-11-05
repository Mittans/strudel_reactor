import { IoIosAddCircle } from "react-icons/io";

export function Add(props){
    return (
        <div>
            <button className="flex content-center" onClick={props.modalOpenControl} title="Add song"> 
                <IoIosAddCircle className="mx-1 self-center text-[28px] text-blue-500 hover:text-blue-700"/>
            </button>
        </div>
    );
}