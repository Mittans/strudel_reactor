export default function setCycle(songText, cycleData, newCycleText) {
    let newSongText = songText;

    if (cycleData.isCycleExists) {
        const cycleType = cycleData.isPerMinute ? 'setcpm' : 'setcps';
        const newFullText = `${cycleType}(${newCycleText})`
        newSongText = songText.replaceAll(cycleData.fullText, newFullText)
    }

    console.log(newSongText)

    return newSongText
}