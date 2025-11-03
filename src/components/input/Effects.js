export function Effects(props){
    const effectList = ["reverse","wave","pan"];

    return (
        <div className={`flex mx-2 bg-black rounded-lg border border-black ${props.isOpenEffects ? "" : "hidden"}`}>
            <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexRadio" id="flexRadio0" defaultChecked/>
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor="flexRadio0">
                    None
                </label>
            </div>
            {effectList.map((effect) => (
                 <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexRadio" id={`flexRadio-${effect}`}/>
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor={`flexRadio-${effect}`}>
                    {effect}
                </label>
            </div>
            ))}
        </div>
    );
}