export function preProcess({ inputText, volume }) {
    let outputText = inputText + "\n// Volume set to " + volume;

    outputText += `\n//all(x => x.gain(${volume}));`

    outputText = outputText.replaceAll('{$Volume}', volume)

    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm

    let m;

    let matches = []

    while ((m = regex.exec(outputText)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        m.forEach((match, groupIndex) => {
            matches.push(match);
        });
    }

    let matches2 = matches.map(
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
            `gain(${captureGroup}*${volume})`
        )
    );

    let matches3 = matches.reduce(
        (text, original, i) => text.replace(original, matches2[i]), outputText);

    console.log(matches3);

    return matches3;

}
