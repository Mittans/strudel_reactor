export function Instrument(props){
    const instrumentList = ["RolandTR808","RolandTR606","KorgDDM110", "OberheimDmx"];

    return (
        <div className={`flex mx-2 bg-black rounded-lg border border-black ${props.isOpenInstrument ? "" : "hidden"}`}>
            <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexInstrument" id="flexInstrument0" defaultChecked/>
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor="flexInstrument0">
                    None
                </label>
            </div>
            <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexInstrument" id="flexInstrumentAll"/>
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor="flexInstrumentAll">
                    All
                </label>
            </div>
            {instrumentList.map((instrument) => (
                 <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexInstrument" id={`flexInstrument-${instrument}`}/>
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor={`flexInstrument-${instrument}`}>
                    {instrument}
                </label>
            </div>
            ))}
        </div>
    );
}