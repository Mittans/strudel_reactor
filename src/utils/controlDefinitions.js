export const CONTROL_DEFINITIONS = {
    speed: { type: "slider", min: 0.1, max: 4, step: 0.1, default: 1 },
    gain: { type: "slider", min: 0, max: 100, step: 1, default: 50 },
    reverb: { type: "slider", min: 0, max: 1, step: 0.01, default: 0 },
    octave: { type: "number", min: -3, max: 10, default: 0 },
    arp_rate: { type: "slider", min: 0.1, max: 4, step: 0.1, default: 1 },
    cps: { type: "number", min: 0.1, max: 10, step: 0.1, default: 0.5 }, // NEW CPS control
};

/**
 * Extract control parameters from code and their current values
 */
export function extractControlsFromCode(code) {
    if (!code) return { controls: [], initialValues: {} };

    const found = [];
    const initialValues = {};

    for (const key of Object.keys(CONTROL_DEFINITIONS)) {
        // Look for patterns like:
        // - key(number)
        // - key <space> number
        // - .key(number)
        
        const patterns = [
            new RegExp(`\\b${key}\\s*\\(\\s*([0-9.]+)\\s*\\)`, 'g'),  // key(2.5)
            new RegExp(`\\.${key}\\s*\\(\\s*([0-9.]+)\\s*\\)`, 'g'),   // .key(2.5)
            new RegExp(`\\b${key}\\s+([0-9.]+)\\b`, 'g')               // key 2.5
        ];

        let foundMatch = false;
        
        for (const pattern of patterns) {
            const matches = [...code.matchAll(pattern)];
            if (matches.length > 0) {
                foundMatch = true;
                // Use the first match value as initial
                const firstValue = parseFloat(matches[0][1]);
                if (!isNaN(firstValue)) {
                    initialValues[key] = firstValue;
                }
                break;
            }
        }

        if (foundMatch) {
            found.push(key);
            // If no value was captured, use default
            if (!(key in initialValues)) {
                initialValues[key] = CONTROL_DEFINITIONS[key].default;
            }
        }
    }

    return { controls: found, initialValues };
}

/**
 * Apply control values to code, handling multiple formats
 */
export function applyControlsToCode(baseCode, values) {
    if (!baseCode) return baseCode;
    
    let result = baseCode;

    for (const [key, val] of Object.entries(values)) {
        // Replace different patterns:
        
        // 1. Function call with parentheses: key(oldValue)
        const funcPattern = new RegExp(`\\b${key}\\s*\\(\\s*[0-9.]+\\s*\\)`, 'g');
        result = result.replace(funcPattern, `${key}(${val})`);

        // 2. Method call: .key(oldValue)
        const methodPattern = new RegExp(`\\.${key}\\s*\\(\\s*[0-9.]+\\s*\\)`, 'g');
        result = result.replace(methodPattern, `.${key}(${val})`);

        // 3. Space-separated: key oldValue
        const spacePattern = new RegExp(`\\b${key}\\s+[0-9.]+\\b`, 'g');
        result = result.replace(spacePattern, `${key} ${val}`);
    }

    return result;
}