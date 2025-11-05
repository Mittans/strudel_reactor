import { FaAngleDown, FaAngleUp } from "react-icons/fa";

export function OpenShowTimeButton({handleOpenShowTime, isOpenShowTime}){
    return (
        <button 
            className={`text-2xl text-center flex items-center justify-between font-bold flex justify-center rounded-lg w-full border border-black ${isOpenShowTime ? ("bg-black text-yellow-500") : ("bg-white text-black") }`}
            onClick={handleOpenShowTime}> 
                <span className="flex-1 text-center">Show time</span>
                <div className='mx-2 flex items-center'>
                        {isOpenShowTime ? (<FaAngleUp />) : (<FaAngleDown />)}
                </div>
        </button>
    )
};