import {Speed} from './slideInputs/Speed';
import {Volume} from './slideInputs/Volume';

export function SlideInputs(props){

    return (
        <div className='flex'>
            <Speed/>
            <Volume onVolumeChange={props.onVolumeChange} />
        </div>
    );
}