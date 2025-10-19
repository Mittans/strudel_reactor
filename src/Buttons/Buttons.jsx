import { FaCircleStop } from "react-icons/fa6";
import { CiPlay1 } from "react-icons/ci";
import { FcProcess } from "react-icons/fc";
import { BiReset } from "react-icons/bi";

export function Play(props){
    return (
        <div>
            <button id={props.id} className="btn btn-outline-secondary d-flex align-items-center"> 
                <CiPlay1 className="mx-1" style={{color:"green"}}></CiPlay1>
                <div className="mx-1">Play</div>
            </button>
        </div>
    );
}

export function Process(props){
    return (
        <div>
            <button id={props.id} className="btn btn-outline-primary d-flex align-items-center">
                <FcProcess  className="mx-1" style={{color:"blue"}}></FcProcess >
                <div className="mx-1">Preprocess</div>
            </button>
        </div>
    );
}

export function ProPlay(props){
    return (
        <div>
            <button id={props.id} className="btn btn-outline-info d-flex align-items-center">
                <BiReset className="mx-1" style={{color:"light blue"}}></BiReset>
                 <div className="mx-1">Proc & Play</div>
            </button>
        </div>
    );
}

export function Stop(props){
    return (
        <div>
            <button id={props.id} className="btn btn-outline-danger d-flex align-items-center"> 
                <FaCircleStop className="mx-1" style={{color: "red"}}></FaCircleStop> 
                <div className="mx-1"> Stop </div>
            </button>
        </div>
    );
}