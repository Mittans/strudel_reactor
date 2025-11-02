export default function getCycleData(songText) {
    const cycleData = {
        isCycleExists: false,
        isPerMinute: false,
        text: '',
        value: 0
    }

    // Get last used cycle interval type
    const cpmLastIndex = songText.lastIndexOf('setcpm(');
    const cpsLastIndex = songText.lastIndexOf('setcps(');
    const lastUsedCycleIndex = Math.max(cpmLastIndex, cpsLastIndex);

    cycleData.isCycleExists = lastUsedCycleIndex != -1;
    cycleData.isPerMinute = cpmLastIndex > cpsLastIndex;

    // Get the cycle value from the song text
    if (cycleData.isCycleExists) {
        const startIndex = songText.indexOf('(', lastUsedCycleIndex) + 1;
        const endIndex = songText.indexOf(')', startIndex)
        cycleData.text = songText.slice(startIndex, endIndex);

        try {
            if (cycleData.isPerMinute) {
                cycleData.value = eval(cycleData.text);
            } else {
                cycleData.value = eval(cycleData.text) * 60;
            }
        } catch {
            cycleData.value = 0;
        }
    }

    return cycleData
}