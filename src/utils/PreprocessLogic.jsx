export function Preprocess({ inputText, volume, cpm, lpf }) {



    let outputText = inputText + "\n//AHHHHH 67";

    outputText += `\n\nall(x => x.gain(${volume}))`

    //replaces volume everywhere
    outputText = outputText.replaceAll("${VOLUME}", volume)
    
   //replaces cpm if its a finite number 
if (Number.isFinite(cpm)) {
  outputText = outputText.replaceAll("${CPM}", cpm);
}


  if (lpf === null || typeof lpf === "undefined") {
     // if no lpf selected replace with safe high value
    outputText = outputText.replaceAll("${LPF}", 20000);
  } else if (Number.isFinite(lpf)) {
    // replace with chosen value
    outputText = outputText.replaceAll("${LPF}", lpf);


    // global lpf
    outputText += `\n\nall(x => x.lpf(${lpf}))`;
  }

    let regex = /[a-zA-Z0-9_]+:\s*\n[\s\S]+?\r?\n(?=[a-zA-Z0-9_]+[:\s/])/gm;

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

    let matches2 = matches.map(
        match => match.replaceAll(/(?!post)gain\((([\d.]+))\)/g, (match, captureGroup) =>
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

