
export const music = `setcpm(140/60/4)



samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')
samples('bubo:waveforms')


{S1}: note("<[g3,b3,e4]!2 [a3,c3,e4] [b3,d3,f#4]>")
.n("<1 2 3 4 5 6 7 8 9 10>/2").room(0.5).size(0.9)
.s('wt_flute').velocity(0.25).often(n => n.ply(2))
.release(0.125).decay("<0.1 0.25 0.3 0.4>").sustain(0)
.cutoff(2000).cutoff("<1000 2000 4000>")
._scope()


{D1}: s("<bd!2 ~ cp bd!2 ~ [cp cp]>").bank("RolandTR808")
{D2}: s("<~ ~ hh ~ ~ ~ hh ~ [hh,hh] >").bank("RolandTR909")

//all(x => x.gain({VOLUME})

//all(x => x.gain(mouseX.range(0,1)))
//all(x => x.log())'`;
