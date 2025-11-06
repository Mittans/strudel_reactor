export function InstrumentsProc(inputText, instruments) {
    console.log("instruments = " + instruments)

    
    //select all everything that isn't a comment and starts with \n and ends with :
    //then add a _ to the start unless it's in the instruments list e.g. ["drums"]
    let out = inputText
    let regtext = "(?:(?<=\\n)|^)(?!'':)([^:(\\s]+)\\s*:"

    if (instruments.length > 0) {
        regtext = "(?:(?<=\n)|^)(?!"

        instruments.forEach((instrument) => {
            regtext += instrument + "\\s*:|"
        })

        regtext = regtext.slice(0, -1);
        regtext += ")([^:(\\s]+)\\s*:"
    }



    let regex = new RegExp(regtext, "gm")
    //console.log("Reg1 = " + regex)
    //regex = /(?:(?<=\n)|^)(?!'':)([^:(\s]+)\s*:/gm

    out = inputText.replace(regex, "_$&")

    //console.log("Reg2 = " + regex)
    //console.log("Matches = " + matches)


    //console.log(matchesReduce)

    return out;
}