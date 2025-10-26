let originalLog = null;
const logArray = [];


export default function console_monkey_patch() {

    //If react multicalls this, do nothing
    if (originalLog) return;

    originalLog = console.log;

    //Overwrite console.log function
    console.log = function (...args) {
        //Join args with space, default behaviour. Check for [hap], that's a strudel prefix
        if (args.join(" ").substring(0, 8) === "%c[hap] ")
        {

            //If so, add it to the Array of values.
            //Then remove the oldest values once we've hit 100.
            logArray.push(args.join(" ").replace("%c[hap] ", ""));

            if (logArray.length > 100) {
                logArray.splice(0, 1);
            }
            //Dispatch a customevent we can listen to in App.js
            const event = new CustomEvent("d3Data", { detail: [...logArray] });
            document.dispatchEvent(event);

        }
        originalLog.apply(console, args);
    };

}

export function getD3Data() {
    return [...logArray];
}

export function subscribe(eventName, listener) {
    document.addEventListener(eventName, listener);
}

export function unsubscribe(eventName, listener) {
    document.removeEventListener(eventName, listener);
}
