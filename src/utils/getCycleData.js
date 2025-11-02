export default function getCycleData(songText) {
    const cycleData = {
        isCycleExists: false,
        isPerMinute: false,
        fullText: '',
        cycleText: '',
        value: NaN
    }

    // Get last used cycle interval type
    const cpmLastIndex = songText.lastIndexOf('setcpm(');
    const cpsLastIndex = songText.lastIndexOf('setcps(');
    const lastUsedCycleIndex = Math.max(cpmLastIndex, cpsLastIndex);

    cycleData.isCycleExists = lastUsedCycleIndex != -1;
    cycleData.isPerMinute = cpmLastIndex > cpsLastIndex;

    if (cycleData.isCycleExists) {
        // Get the cycle values from the song text
        const startIndex = songText.indexOf('(', lastUsedCycleIndex) + 1;
        const endIndex = songText.indexOf(')', startIndex)
        cycleData.fullText = songText.slice(lastUsedCycleIndex, endIndex + 1);
        cycleData.cycleText = songText.slice(startIndex, endIndex);

        // Calculate speed
        try {
            cycleData.value = eval(cycleData.cycleText);
        } catch {
            cycleData.value = NaN;
        }
    }

    return cycleData
}