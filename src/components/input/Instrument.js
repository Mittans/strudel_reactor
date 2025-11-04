import { useProcessInstrument } from "./UseProcessInstrument";

export function Instrument({updateEditor, isOpenInstrument}){
    const instrumentList = ["RolandTR808","RolandTR606","KorgDDM110", "OberheimDmx"];
    const { handleInstrumentChange } = useProcessInstrument({updateEditor, instrumentList});

    return (
        <div className={`flex mx-2 bg-black rounded-lg border border-black ${isOpenInstrument ? "" : "hidden"}`}>
            <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexInstrument" id="flexInstrument-None" defaultChecked onChange={handleInstrumentChange}/>
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor="flexInstrument-None">
                    None
                </label>
            </div>
            <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexInstrument" id="flexInstrument-All" onChange={handleInstrumentChange}/>
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor="flexInstrument-All">
                    All
                </label>
            </div>
            {instrumentList.map((instrument) => (
                    <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexInstrument" id={`flexInstrument-${instrument}`} onChange={handleInstrumentChange}/>
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor={`flexInstrument-${instrument}`}>
                    {instrument}
                </label>
            </div>
            ))}
        </div>
    );
}