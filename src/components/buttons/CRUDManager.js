import {Save, Load, Delete, Add} from './Buttons';

export function CRUDManager(props){
    return (
      <div className='border border-black mx-2 bg-black rounded-lg'>
          <nav className="flex justify-evenly">
            <div className="p-2">
              <Delete id="delete" handleDelete={props.handleDelete}/>
            </div>
            <div className="p-2">
              <Add id="add" modalOpenControl={props.modalOpenControl}/>
            </div>
            <div className="p-2">
              <Load id="load" handleLoad={props.handleLoad}/>
            </div>
            <div className="p-2">
              <Save id="save" handleSave={props.handleSave}/>
            </div>
          </nav>
        </div>
    );
}