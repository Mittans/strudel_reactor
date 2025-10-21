export function Speed(props){
    return (
        <div className="flex">
            <labe className={props.className}> Enter speed: </labe>
            <input className="border border-black rounded-md" type="number" min="0" />
        </div>
    );
}