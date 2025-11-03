import { arp } from "@strudel/core";

export const CONTROL_DEFINITIONS = {
    speed: { type: "slider", min: 0.1, max: 4, step: 0.1 },
    gain: { type: "slider", min: 0, max: 100, step: 1 },
    reverb: { type: "slider", min: 0, max: 1, step: 0.01 },
    octave: { type: "number", min: -3, max: 3 },
    arp_rate: { type: "slider", min: 0.1, max: 4, step: 0.1 },
    vol: { type: "slider", min: 0, max: 100, step: 1 },
};

export function extractControlsFromCode(code) {
    if (!code) return [];

    const found = [];

    for (const key of Object.keys(CONTROL_DEFINITIONS)) {
        if (code.includes(key)) {
            found.push(key);
        }
    }

    return found;
}