import { BiReset } from "react-icons/bi";

export function ProPlay(props){
    return (
        <div>
            <button id={props.id} className="flex p-1" onClick={props.handleProcPlay}>
                <BiReset className="mx-1 self-center text-2xl text-yellow-500"/>
                <div className="mx-1 font-bold text-yellow-500">Proc & Play</div>
            </button>
        </div>
    );
}
