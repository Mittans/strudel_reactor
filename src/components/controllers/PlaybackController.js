import {Stop} from '../buttons/playback buttons/StopButton';
import {Play} from '../buttons/playback buttons/PlayButton';
import {ProPlay} from '../buttons/playback buttons/ProPlayButton';

export function PlaybackController(props){
    return (
        <div>
            <nav className="flex justify-end">
              <div className="p-2">
                <ProPlay id="process_play" handleProcPlay={props.handleProcPlay}></ProPlay>
              </div>
              {props.isPlay ? (
              <div className="p-2">
                  <Stop id="stop" handleStop={props.handleStop}></Stop>
              </div>
              ) : (
              <div className="p-2">
                <Play id="play" handlePlay={props.handlePlay}></Play>
              </div>
              )}
            </nav>
          </div>
    );
}
