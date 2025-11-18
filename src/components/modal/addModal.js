import { useState } from "react";

export function duplicateNumber(songName){
    let number = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
        const song = localStorage.key(i);

        // If it exists, count the number of duplications.
        if (song == songName) {
            number+=1;
        }
    }
    return number
}

export default function AddModal(props){
    const [songName, setSongName] = useState("Untitled");

    // Function to save the text song based on name.
    const handleAdd = () => {
        console.log(JSON.stringify(props.text))

        const isduplicated = localStorage.getItem(songName);
        if (isduplicated) {
            localStorage.setItem(songName+"("+duplicateNumber(songName)+")", JSON.stringify(props.text));
        } else {
            localStorage.setItem(songName, JSON.stringify(props.text));
        }
        alert("Saved song to local storage");
    };

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <form className="w-200 h-200 bg-white rounded-lg">

                {/* Title */}
                <div className="flex justify-between align-center text-3xl p-5 bg-black text-yellow-500">
                    <h2 className="font-bold"> Name your song </h2>
                </div>

                {/* Input Song Name */}
                <div className="px-10 py-5 rounded-lg flex justify-center">
                    <input 
                    className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-black rounded-lg" 
                    placeholder="name"
                    value={songName}
                    onChange={(e) => setSongName(e.target.value)}
                    />
                </div>

                {/* Buttons */}
                <div className="flex justify-center">
                    <div className="m-2">
                        <button 
                            className="rounded-full font-bold w-20 mr-2 border border-black mx-2 bg-green-500 text-white" 
                            onClick={handleAdd}>
                                Add
                        </button>
                    </div>
                    <div className="m-2">
                        <button 
                        className="rounded-full font-bold w-20 mr-2 border border-black mx-2 bg-red-600 text-white" 
                        onClick={props.modalCloseControl}>
                            Close
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}