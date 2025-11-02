export default function setCycleInterval(songText, cycleData) {
    let newSongText = songText;

    if (cycleData.isCycleExists) {
        const cycleType = cycleData.isPerMinute ? 'setcpm' : 'setcps';
        const newCycleType = cycleData.isPerMinute ? 'setcps' : 'setcpm';
        newSongText = songText.replaceAll(cycleType, newCycleType)
    }

    return newSongText
}