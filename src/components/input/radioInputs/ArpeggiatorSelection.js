import {useEffect, useState} from "react";

export function ArpeggiatorSelection({text, handleChangeArp}) {
    const [arpeggiators, setArpeggiators] = useState([]);

    // Automatically get the arpeggiators in the text.
    useEffect(() => {
        extractArpeggiatorNames(text);
    },[text])

    // Allow to get all the arpggiators in tune.js
    function extractArpeggiatorNames(tuneText) {
        const regex = /const\s+(arpeggiator\d+)\s*=/g;
            let match;
            const found = [];
            while ((match = regex.exec(tuneText)) !== null) {
                found.push(match[1]); 
            }
            setArpeggiators(found);
        }

    return (
        <div className={`flex mx-2`}>
            {text.length === 0 ? (
                <div className="text-yellow-200 text-center">
                The text is empty, please add something.
            </div>
            ) : arpeggiators.length === 0 ? (
            <div className="text-yellow-200 text-center">
                No arpeggiators found, please add "const arpeggiator = []".
            </div>
            ) : 
            (
            <div className={`flex mx-2`}>
                {arpeggiators.map((arp) => (
                    <div className="m-2 p-2">
                        <input className="hidden peer" type="radio" name="flexRadioDefault" id={`flexRadioDefault${arp}`} value={arp} onChange={handleChangeArp}/>
                    <label 
                        className="block text-center cursor-pointer peer-checked:bg-yellow-400 bg-zinc-800 text-yellow-200 hover:bg-yellow-500 hover:text-black rounded-lg px-4 py-3 font-semibold transition-all duration-200" 
                        htmlFor={`flexRadioDefault${arp}`}>
                    {arp}
                    </label>
                </div>
                ))}
            </div>
            )}
        </div>
    )
}