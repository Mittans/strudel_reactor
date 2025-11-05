import { useProcessEffect } from "./UseProcessEffect";

export function Effects({isOpenEffects, updateEditor}){
    const effectList = ["reverse","wave","pan"];
    const { handleEffectChange } = useProcessEffect({updateEditor});

    return (
        <div className={`flex mx-2 bg-black rounded-lg border border-black ${isOpenEffects ? "" : "hidden"}`}>
            <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexRadio" id="flexRadio-None" defaultChecked onClick={handleEffectChange}/>
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor="flexRadio-None">
                    None
                </label>
            </div>
            {effectList.map((effect) => (
                 <div className="m-2 p-2">
                <input className="hidden peer" type="radio" name="flexRadio" id={`flexRadio-${effect}`} onClick={handleEffectChange}/>
                <label className="peer-checked:bg-yellow-500 bg-yellow-400 text-black rounded-md px-5 py-2 font-bold" htmlFor={`flexRadio-${effect}`}>
                    {effect}
                </label>
            </div>
            ))}
        </div>
    );
}