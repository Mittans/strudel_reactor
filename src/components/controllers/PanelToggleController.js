import {Effects} from '../input/Effects';
import { Instrument } from '../input/Instrument';
import { MainSong } from '../input/MainSong';
import { IoIosAddCircle } from "react-icons/io";

export function PanelToggleController({
    updateEditor,
    text,
    ProcAndPlay,
    handleChangeArp
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
                </div>
                
                <MainSong text={text} handleChangeArp={handleChangeArp}/>
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
                    <button
                    className={`w-full text-xl outline-2 outline-offset-2 outline-solid text-yellow-500 rounded-lg font-bold`}> 
                    Instrument
                    </button>
                </div>

                <Instrument 
                updateEditor={updateEditor} 
                text={text}
                />
            </div>
        </div>
    );
}