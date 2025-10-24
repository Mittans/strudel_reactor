import { useEffect, useState } from "react";
import { BsList } from "react-icons/bs";
import { Speed } from './speed'
import {Instrument} from './instrument'
import { Effects } from './effects'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { MdCancel } from "react-icons/md";

export function ListComponents(){
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return (
        <div>
            {isOpen ? (
            <div className="flex">
               
                <div className="flex border border-black rounded-lg bg-black">
                    <div className="flex self-center">
                        <Speed className="text-yellow-500 font-bold mx-2"/>
                        <Instrument className="text-yellow-500 font-bold mx-2"/>
                        <Effects className="text-yellow-500 font-bold mx-2"/>
                        <div className="flex">
                            <button>
                                <IoIosCheckmarkCircle className="text-green-500 text-3xl mx-2" />
                            </button>
                            <button>
                                <MdCancel className="text-red-500 text-3xl mx-2"/>
                            </button>
                        </div>
                    </div>
                </div>
                <button className="flex p-1 bg-black w-10 rounded-md mx-2" onClick={handleClose}> 
                        <BsList className="text-yellow-500 text-3xl"/>
                </button>
            </div>
            ) : (
            <button className="flex p-1 w-10 mx-2" onClick={handleOpen}> 
                <BsList className="text-red-500 text-3xl"/>
            </button>
            )}
        </div>
    );
}