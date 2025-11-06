export function SpeedProc(inputText, speed) {
    let out = inputText
    let regex = /(?<=setcps\()[^)]*(?=\))/gm


    //outputText = outputText.replaceAll("{$VOL}", vol)

    out = inputText.replace(regex, speed)
    console.log("out =" + out)


    //console.log("matches = " + matches)

    return out;
}