
export default function SaveModal(props){
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <span className="w-200 h-200 bg-white rounded-lg">

                {/* Title */}
                <div className="flex justify-between align-center text-3xl p-5 bg-black text-yellow-500">
                    <h2 className="font-bold"> Name your song </h2>
                </div>

                {/* Input Song Name */}
                <div className="px-10 py-5 rounded-lg flex justify-center">
                    <input className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 border border-black rounded-lg" placeholder="name"/>
                </div>

                {/* Buttons */}
                <div className="flex justify-center">
                    <div className="m-2">
                        <button 
                            className="rounded-full font-bold w-20 mr-2 border border-black mx-2 bg-green-500 text-white" 
                            onClick={props.handleClose}>
                                Save
                        </button>
                    </div>
                    <div className="m-2">
                        <button 
                        className="rounded-full font-bold w-20 mr-2 border border-black mx-2 bg-red-600 text-white" 
                        onClick={props.handleClose}>
                            Close
                        </button>
                    </div>
                </div>
            </span>
        </div>
    )
}