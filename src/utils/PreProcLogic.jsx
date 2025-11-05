export function PreProcess({inputText, volume}) {
    let outputText = inputText + "\n//Hello, this is a test";

    outputText += `\n//all(x => x.gain(${volume}))`

    // use this for setCPM later
    outputText = outputText.replaceAll("{$VOLUME}", volume)

    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]*[:\/])/gm;

    let m;

    let matches = []

    while ((m = regex.exec(outputText)) !== null) {
        //This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }

        // The result can be accessed through the 'm'-variable
        m.forEach((match, groupIndex) => {
            matches.push(match)
        });
    }

    let matches2 = matches.map(
        match => match.replaceAll(/(?<!post)gain\(([\d.]+)\)/g, (match, captureGroup) => 
            `gain(${captureGroup}*${volume})`
        )
    );

    let matches3 = matches.reduce(
        (text, original, i) => text.replaceAll(original, matches2[i]), 
            outputText);

    console.log(matches3);

    return matches3;
}