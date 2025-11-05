export const stranger_tune = `
setcps(<CPS>)
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')

$: s("<DRUMS>").room(<ROOM>).gain(<GAIN>)
$: n("c3 e3 g3 c4").sound("<SYNTH>")
`.trim();