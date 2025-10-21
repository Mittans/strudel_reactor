export function Instrument(props){
    return (
        <div className="flex">
            <label className={props.className}> Instrument: </label>
            <select className="border border-black bg-yellow-500 rounded-md mx-1 font-bold text-black"> 
                <option> PIANO </option>
                <option> GUITAR </option>
            </select>
        </div>
    );
}