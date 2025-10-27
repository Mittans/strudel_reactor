export function Instrument(props){
    const instrumentList = ["saw","sine","sawtooth"];

    return (
        <div className="flex">
            <label className={props.className}> Instrument: </label>
            <select className="border border-black bg-yellow-500 rounded-md mx-1 font-bold text-black"> 
                <option 
                className="text-sm text-center font-bold bg-gray-200 text-black w-40 rounded-lg"
                value=""> 
                Choose instrument 
                </option>
                {instrumentList.map((ins) => (
                    <option 
                    className="text-sm text-center font-bold bg-gray-200 text-black w-40 rounded-lg"
                    value={ins}> 
                    {ins} 
                    </option>
                ))}

            </select>
        </div>
    );
}