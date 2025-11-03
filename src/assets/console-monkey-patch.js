let originalLog = null;
const logArray = [];

export default function console_monkey_patch() {
    // If react multicalls this, do nothing
    if (originalLog) {
        console.warn("Monkey patch already applied");
        return;
    }

    originalLog = console.log;

    // Overwrite console.log function
    console.log = function (...args) {
        const message = args.join(" ");
        
        // Look for [hap] messages or messages with note: patterns
        if (message.includes("[hap]") || message.includes("note:")) {
            console.warn("Captured musical log:", message.substring(0, 100) + "...");
            
            // Extract the meaningful part
            let cleaned = message.replace("%c[hap] ", "").replace("[hap] ", "");
            
            logArray.push(cleaned);

            if (logArray.length > 100) {
                logArray.splice(0, 1);
            }
            
            // Dispatch a customevent
            const event = new CustomEvent("d3Data", { detail: [...logArray] });
            document.dispatchEvent(event);
            console.warn("Dispatched d3Data event with", logArray.length, "entries");
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