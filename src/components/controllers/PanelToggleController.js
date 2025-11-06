import {Effects} from '../input/Effects';
import { Instrument } from '../input/Instrument';
import { MainSong } from '../input/MainSong';

export function PanelToggleController({
    updateEditor,
    text,
    ProcAndPlay
}) {
    return (
        <div className='flex mx-8'>
            <div className={`w-full outline-2 outline-offset-2 outline-solid p-4 mx-4 rounded-2xl border border-zinc-700 bg-zinc-900 shadow-lg`}>
                <button
                className={`w-full text-xl outline-2 outline-offset-2 outline-solid text-yellow-500 font-bold `}> 
                Main
                </button>

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
                <button
                className={`w-full text-xl outline-2 outline-offset-2 outline-solid text-yellow-500 rounded-lg font-bold`}> 
                Instrument
                </button>

                <Instrument 
                updateEditor={updateEditor} 
                text={text}
                />
            </div>
        </div>
    );
}