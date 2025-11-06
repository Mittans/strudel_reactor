export function Preprocess({ inputText, volume, bpm }) {
    let outputText = inputText;

    outputText += `\n// all(x => x.gain(${volume}))`;
    outputText = outputText.replaceAll("${VOLUME}", volume);

    if (Number.isFinite(Number(bpm))) {
        const pattern = /setcps\(\s*([0-9.]+)\s*\/\s*60\s*([^\)]*)\)/g;
        outputText = outputText.replace(
            pattern,
            (_m, _oldBpm, tail) => `setcps(${bpm}/60${tail || ''})`
        );
    }

    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    let m;
    let matches = [];
    while ((m = regex.exec(outputText)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        m.forEach((match, groupIndex) => {
            matches.push(match);
        });
    }

    let matches2 = matches.map(match =>
        match.replaceAll(/(?!post)gain\(([\d.]+)\)/g, (match, captureGroup) =>
            `gain(${captureGroup}*${volume})`
        )
    );

    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]),
        outputText
    );

    console.log(matches3);
    return matches3;
}
