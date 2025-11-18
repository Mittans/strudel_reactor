import {Speed} from '../input/slideInputs/Speed'
import {Volume} from '../input/slideInputs/Volume';

export function SlideInputs({text, updateEditor, volume, setVolumeState}){

    return (
        <div className='flex justify-center'>
            <Speed text={text} updateEditor={updateEditor}/>
            <Volume text={text} updateEditor={updateEditor} volume={volume} setVolumeState={setVolumeState}/>
        </div>
    );
}