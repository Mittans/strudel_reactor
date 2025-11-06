export function PreProcess({ inputText, vol, speed}) {
    let outText = inputText

    outText = volProc(inputText, vol)

    outText = speedProc(inputText, speed)

    return outText
}
function speedProc(inputText, speed) {
    let out = inputText
    let regex = /(?<=setcps\()[^)]*(?=\))/gm

    
    //outputText = outputText.replaceAll("{$VOL}", vol)

    out = inputText.replace(regex, speed)



    //console.log("matches = " + matches)

    return out;
}
function volProc(inputText, vol) {
    let out = inputText
    //out += `\n//all(x => x.gain(${vol}))`

    //outputText = outputText.replaceAll("{$VOL}", vol)

    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    let m;

    let matches = []

    while ((m = regex.exec(out)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        m.forEach((match, groupIndex) => {
            matches.push(match)
        })
    }

    let gainMatches = matches.map(
        match => match.replaceAll(
            /(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
            `gain(${captureGroup}*${vol})`
        ))

    let matchesReduce = matches.reduce(
        (text, original, i) => text.replaceAll(original, gainMatches[i]),
        out)

    //console.log(matchesReduce)

    return matchesReduce;
}