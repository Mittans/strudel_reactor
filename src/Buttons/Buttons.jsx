import { FaCircleStop } from "react-icons/fa6";
import { CiSaveDown2 } from "react-icons/ci";
import { FaRecycle, FaPlay, FaDownload } from "react-icons/fa";
import { BiReset } from "react-icons/bi";

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

export function Process(props){
    return (
        <div>
            <button id={props.id} className="flex p-1">
                <FaRecycle  className="mx-1 self-center text-yellow-500" />
                <div className="mx-1 text-yellow-500 font-bold">Preprocess</div>
            </button>
        </div>
    );
}

export function ProPlay(props){
    return (
        <div>
            <button id={props.id} className="flex p-1" onClick={props.handlePlay}>
                <BiReset className="mx-1 self-center text-yellow-500"/>
                 <div className="mx-1 font-bold text-yellow-500">Proc & Play</div>
            </button>
        </div>
    );
}

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

export function Save(){
    return (
        <div>
            <button className="flex p-1 content-center"> 
                <CiSaveDown2 className="mx-1 self-center text-yellow-500"/>
                <div className="mx-1 font-bold text-yellow-500"> Save </div>
            </button>
        </div>
    );
}

export function Load(props){
    return (
        <div>
            <button id={props.id} className="flex p-1"> 
                <FaDownload className="mx-1 self-center text-yellow-500 "></FaDownload>
                <div className="mx-1 font-bold text-yellow-500"> Load </div>
            </button>
        </div>
    );
}