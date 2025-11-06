import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export function OpenTextToProcessButton({handleOpenTextToProcess, isOpenTextToProcess}){
    return (
        <button 
            className={`outline-2 outline-offset-2 outline-solid border border-red-500 duration-300 ease-in-out text-3xl p-4 text-center flex items-center justify-between font-bold flex justify-center rounded-lg w-full border border-black ${isOpenTextToProcess ? ("bg-black text-yellow-500") : ("bg-white text-black") }`}
            onClick={handleOpenTextToProcess}> 
                <span className="flex-1 text-center">Text To Process</span>
                <div className='mx-2 flex items-center'>
                        {isOpenTextToProcess ? (<FaAngleUp />) : (<FaAngleDown />)}
                </div>
        </button>
    )
};