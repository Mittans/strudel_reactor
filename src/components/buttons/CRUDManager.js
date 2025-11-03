import {Save, Load, Delete} from './Buttons';

export function CRUDManager(props){
    return (
      <div>
          <nav className="flex justify-evenly">
            <div className="p-2">
              <Delete id="delete" handleDelete={props.handleDelete}/>
            </div>
            <div className="p-2">
              <Save id="save" modalOpenControl={props.modalOpenControl}/>
            </div>
            <div className="p-2">
              <Load id="load" handleLoad={props.handleLoad}/>
            </div>
          </nav>
        </div>
    );
}