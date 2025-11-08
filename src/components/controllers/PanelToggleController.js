import {Effects} from '../input/Effects';
import { Instrument } from '../input/Instrument';
import { MainSong } from '../input/MainSong';
import { IoIosAddCircle } from "react-icons/io";

export function PanelToggleController({
    updateEditor,
    text,
    ProcAndPlay
}) {
    return (
        <div className='flex mx-8'>
            <div className={`w-full outline-2 outline-offset-2 outline-solid p-4 mx-4 rounded-2xl border border-zinc-700 bg-zinc-900 shadow-lg`}>
                <div className='flex justify-between flex justify-center'>
                    <span className='flex-1 text-center'>
                        <button
                        className={`w-full text-xl outline-2 outline-offset-2 outline-solid text-yellow-500 font-bold`}> 
                        Main
                        </button>
                    </span>
                    <nav>
                        <input className="hidden peer" type="radio" name="flexRadio-Add" id="flexRadio-Add" onChange={ProcAndPlay} />
                        
                        <label 
                            className="block text-center cursor-pointer peer-checked:bg-yellow-400 bg-zinc-800 text-yellow-200 hover:bg-yellow-500 hover:text-black rounded-lg px-2 py-2 font-semibold transition-all duration-200" 
                            htmlFor="flexRadio-Add">
                        <div className="flex justify-center items-center">
                            <IoIosAddCircle className="text-xl"/>
                        </div>
                        </label>
                    </nav>
                </div>


                <MainSong ProcAndPlay={ProcAndPlay} />
            </div>

            <div className={`w-full outline-2 outline-offset-2 outline-solid p-4 mx-4 bg-zinc-900 rounded-2xl border border-zinc-700 shadow-lg`}>
                <button
                className={`w-full text-xl outline-2 outline-offset-2 outline-solid text-yellow-500 font-bold `}> 
                Effects 
                </button>

                <Effects 
                updateEditor={updateEditor} 
                text={text}
                />
            </div>

            <div className={`w-full outline-2 outline-offset-2 outline-solid p-4 mx-4 bg-zinc-900 rounded-2xl border border-zinc-700 shadow-lg`}>
                <div className='flex justify-between flex justify-center'>
                    <span className='flex-1 text-center'>
                        <button
                        className={`w-full text-xl outline-2 outline-offset-2 outline-solid text-yellow-500 rounded-lg font-bold`}> 
                        Instrument
                        </button>
                    </span>
                    <div className='w-20'>
                        <select className='block text-center cursor-pointer peer-checked:bg-yellow-400 bg-zinc-800 text-yellow-200 hover:bg-yellow-500 hover:text-black rounded-lg px-2 py-2 font-semibold transition-all duration-200'>
                            <option value=""> Drum </option>
                            <option value="1"> Piano </option>
                        </select>
                    </div>
                </div>

                <Instrument 
                updateEditor={updateEditor} 
                text={text}
                />
            </div>
        </div>
    );
}