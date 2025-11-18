export const stranger_tune = `setcps(<cpm>/60/4)

samples('github:algorave-dave/samples')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')

all(x => x.postgain(<volume>))
const gain_patterns = [
  "2",
  "{0.75 2.5}*4",
    "{0.75 2.5!9 0.75 2.5!5 0.75 2.5 0.75 2.5!7 0.75 2.5!3 <2.5 0.75> 2.5}%16",
]

const drum_structure = [
"~",
"x*4",
"{x ~!9 x ~!5 x ~ x ~!7 x ~!3 < ~ x > ~}%16",
]

const basslines = [
  "[[eb1, eb2]!16 [f2, f1]!16 [g2, g1]!16 [f2, f1]!8 [bb2, bb1]!8]/8",
  "[[eb1, eb2]!16 [bb2, bb1]!16 [g2, g1]!16 [f2, f1]!4 [bb1, bb2]!4 [eb1, eb2]!4 [f1, f2]!4]/8"
]

const arpeggiator1 = [
"{d4 bb3 eb3 d3 bb2 eb2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
"{d4 bb3 g3 d3 bb2 g2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
]

const arpeggiator2 = [
"{d4 bb3 eb3 d3 bb2 eb2}%16",
"{c4 bb3 f3 c3 bb2 f2}%16",
"{d4 bb3 g3 d3 bb2 g2}%16",
"{d5 bb4 g4 d4 bb3 g3 d4 bb3 eb3 d3 bb2 eb2}%16",
]


const pattern = 0
const bass = 0

bassline:
note(pick(basslines, bass))
.sound("supersaw")
.postgain(2)
.room(0.6)
.lpf(700)
.room(0.4)
.postgain(pick(gain_patterns, pattern))

<s1>main_arp:
note(pick(arpeggiator1, "<0 1 2 3>/2"))
.sound("supersaw")
.lpf(200 + ({volumeS1} * 10))         
.hpf(50 + ({volumeS1} / 20))          
.shape(({volumeS1} / 800))             
.cutoff(200 + ({volumeS1} * 8))        
.gain(0.8 + ({volumeS1} / 1200))       
.room(({volumeS1} / 800))        
.size(0.2 + ({volumeS1} / 1200))
.adsr("0:0.1:0.4:0.1")
.postgain(pick(gain_patterns, pattern))


<d1>drums:
stack(
  s("tech:5")
  .postgain(6)
  .pcurve(2)
  .pdec(1)
  .lpf(500 + ({volumeD1} * 9000))
  .room(0.1 + ({volumeD1} * 0.3))
  .gain(({volumeD1} * 1.2))   
  .struct(pick(drum_structure, pattern)),

  s("sh").struct("[x!3 ~!2 x!10 ~]")
  .postgain(0.5)
  .lpf(1500 + ({volumeD1} * 6000))  
  .bank("RolandTR808")
  .speed(0.8)
  .jux(rev)
  .room(sine.range(0.1,0.4))
  .gain(0.6 * {volumeD1}),

  // Clap layer now also brightens + opens
  s("{~ ~ rim ~ cp ~ rim cp ~!2 rim ~ cp ~ < rim ~ >!2}%8 *2")
  .bank("[KorgDDM110, OberheimDmx]")
  .speed(1.2)
  .lpf(500 + ({volumeD1} * 8500))      
  .room(0.05 + ({volumeD1} * 0.4))
  .postgain(0.15 + ({volumeD1} * 0.9))
)
.postgain({volumeD1})

<d2>drums2: 
stack(
  s("[~ hh]*4").bank("RolandTR808").room(0.3).speed(0.75).gain(1.2),
  s("hh").struct("x*16").bank("RolandTR808")
  .gain(0.6)
  .jux(rev)
  .room(sine.range(0.1,0.4))
  .postgain(0.5),
  
  s("[psr:[2|5|6|7|8|9|12|24|25]*16]?0.1")
  .gain(0.1)
  .postgain(pick(gain_patterns, pattern))
  .hpf(1000)
  .speed(0.5)
  .rarely(jux(rev)),
).lpf(2000 + ({volumeD2} * 8000))
.postgain({volumeD2})


//Remixed and reproduced from Algorave Dave's code found here: https://www.youtube.com/watch?v=ZCcpWzhekEY
// all(x => x.gain(mouseX.range(0,1)))
all(x => x.log())
all(x => x.delay(<echo>))
// @version 1.2`;