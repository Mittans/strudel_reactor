export default function setCycleValue(songText, cycleData, newCycleText) {
    let newSongText = songText;

    if (cycleData.isCycleExists) {
        const cycleType = cycleData.isPerMinute ? 'setcpm' : 'setcps';
        const newFullText = `${cycleType}(${newCycleText})`
        newSongText = songText.replaceAll(cycleData.fullText, newFullText)
    }

    return newSongText
}