import {Save, Play, Stop, ProPlay, Process, Load, Delete} from './Buttons';

export function ControlButtons(props){
    return (
        <div>
            <nav className="flex justify-end">
              <div className="p-2">
                <Process id="process" handleProc={props.handleProc}></Process>
              </div>
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
