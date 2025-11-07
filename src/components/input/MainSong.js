import { IoIosAddCircle } from "react-icons/io";

export function MainSong({ProcAndPlay}) {
    return (
        <div className={`flex mx-2`}>
            <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexRadioDefault" id="flexRadioDefault1" onChange={ProcAndPlay} defaultChecked />
                <label 
                    className="block text-center cursor-pointer peer-checked:bg-yellow-400 bg-zinc-800 text-yellow-200 hover:bg-yellow-500 hover:text-black rounded-lg px-4 py-3 font-semibold transition-all duration-200" 
                    htmlFor="flexRadioDefault1">
                Arpeggiator 1
                </label>
            </div>
            <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexRadioDefault" id="flexRadioDefault2" onChange={ProcAndPlay} />
                <label 
                    className="block text-center cursor-pointer peer-checked:bg-yellow-400 bg-zinc-800 text-yellow-200 hover:bg-yellow-500 hover:text-black rounded-lg px-4 py-3 font-semibold transition-all duration-200" 
                    htmlFor="flexRadioDefault2">
                Arpeggiator 2
                </label>
            </div>
        </div>
    )
}