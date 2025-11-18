import {Speed} from '../input/slideInputs/Speed'
import {Volume} from '../input/slideInputs/Volume';

export function SlideInputs({text, updateEditor, volume, setVolumeState, speed, setSpeed}){

    return (
        <div className='flex justify-center'>
            <Speed text={text} updateEditor={updateEditor} speed={speed} setSpeed={setSpeed}/>
            <Volume text={text} updateEditor={updateEditor} volume={volume} setVolumeState={setVolumeState}/>
        </div>
    );
}