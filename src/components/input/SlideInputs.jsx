import {Speed} from './slideInputs/Speed';
import {Volume} from './slideInputs/Volume';

export function SlideInputs(){

    return (
        <div className='flex'>
            <Speed/>
            <Volume/>
        </div>
    );
}