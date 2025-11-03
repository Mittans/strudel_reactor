export function ButtonShowController(props) {
    return (
        <div className='flex'>
            <button onClick={props.handleOnHush} 
            className={`m-3 text-lg ${props.isOnHush ? "border border-black bg-black text-yellow-500 px-3 rounded-lg font-bold " : "border border-black bg-white text-black px-3 rounded-lg font-bold"}`}> 
            ON&HUSH 
            </button>

            <button onClick={props.handleOpenEffects} 
            className={`m-3 text-lg ${props.isOpenEffects ? "border border-black bg-black text-yellow-500 px-3 rounded-lg font-bold " : "border border-black bg-white text-black px-3 rounded-lg font-bold"}`}> 
            Effects 
            </button>

            <button onClick={props.handleOpenInstrument} 
            className={`m-3 text-lg ${props.isOpenInstrument ? "border border-black bg-black text-yellow-500 px-3 rounded-lg font-bold " : "border border-black bg-white text-black px-3 rounded-lg font-bold"}`}> 
            Instrument
            </button>
        </div>
    );
}