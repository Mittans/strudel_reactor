import { FaCircleStop } from "react-icons/fa6";
import { CiSaveDown2 } from "react-icons/ci";
import { FaRecycle, FaPlay } from "react-icons/fa";
import { BiReset } from "react-icons/bi";

export function Play(props){
    return (
        <div>
            <button id={props.id} className="bg-green-500 flex border border-white rounded-lg p-1" onClick={props.handlePlay}> 
                <FaPlay className="mx-1 self-center text-white "></FaPlay>
                <div className="mx-1 font-bold text-white">Play</div>
            </button>
        </div>
    );
}

export function Process(props){
    return (
        <div>
            <button id={props.id} className="bg-blue-300 flex border border-white rounded-lg p-1">
                <FaRecycle  className="mx-1 self-center text-white" />
                <div className="mx-1 text-white font-bold">Preprocess</div>
            </button>
        </div>
    );
}

export function ProPlay(props){
    return (
        <div>
            <button id={props.id} className="bg-orange-400 flex border border-white rounded-lg p-1" onClick={props.handlePlay}>
                <BiReset className="mx-1 self-center text-white"/>
                 <div className="mx-1 font-bold text-white">Proc & Play</div>
            </button>
        </div>
    );
}

export function Stop(props){
    return (
        <div>
            <button id={props.id} className="bg-red-600 flex border border-white rounded-lg p-1"  onClick={props.handleStop}> 
                <FaCircleStop className="mx-1 bg-red-600 self-center text-white"/>
                <div className="mx-1 text-white font-bold"> Stop </div>
            </button>
        </div>
    );
}

export function Save(){
    return (
        <div>
            <button className="bg-green-700 flex border border-white rounded-lg p-1 content-center"> 
                <CiSaveDown2 className="mx-1 self-center text-white"/>
                <div className="mx-1 font-bold text-white"> Save </div>
            </button>
        </div>
    );
}