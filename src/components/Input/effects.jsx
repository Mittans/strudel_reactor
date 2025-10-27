export function Effects(props){
    const effectList = ["reverse","wave","pan"];

    return (
        <div className="flex mx-2">
            <label className={props.className}> Applied Effects: </label>
            <select className="border border-black bg-yellow-500 rounded-md mx-1 font-bold text-black">
                <option 
                className="text-sm text-center font-bold bg-gray-200 text-black w-40 rounded-lg"
                value=""> 
                    Choose Effect
                </option> 
                {effectList.map((effect) => (
                    <option 
                    className="text-sm text-center font-bold bg-gray-200 text-black w-40 rounded-lg"
                    value={effect}> 
                    {effect} 
                    </option>
                ))}

            </select>
        </div>
    );
}