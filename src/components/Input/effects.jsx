export function Effects(props){
    return (
        <div className="flex mx-2">
            <label className={props.className}> Applied Effects: </label>
            <select className="border border-black bg-yellow-500 rounded-md mx-1 font-bold text-black">
                <option> Effect 1 </option>
                <option> Effect 2 </option>
            </select>
        </div>
    );
}