export const stranger_tune = `setcps(<cpm>/60/4)

all(x => x.postgain(<volume>))

samples('github:algorave-dave/samples')
samples('https://raw.githubusercontent.com/tidalcycles/Dirt-Samples/master/strudel.json')
samples('https://raw.githubusercontent.com/Mittans/tidal-drum-machines/main/machines/tidal-drum-machines.json')

// --------------------- SIMPLE SWITCHES ---------------------
const pattern = 1   // 0=verse, 1=groove, 2=busier
const bass    = 0   // choose a bassline

// --------------------- SHAPE ARRAYS ------------------------
const gain_patterns = [
  "1",
  "{0.9 1.2}*4",
  "{0.85 1.35!7 0.85 1.35!5 <1.1 0.95> 1.35}%16",
]

const drum_structure = [
  "bd bd bd_bd",
  "bd bd bd_bd",
  "{bd !7 bd ~!3 < bd> ~}%8",
]

const basslines = [
  "[[c2, c1]!8 [g2, g1]!8 [a2, a1]!8 [f2, f1]!8]/8",
  "[[c2, c1]!12 [g2, g1]!4 [a2, a1]!8 [f2, f1]!4]/8",
]

const hook_arp = [
  "{e5 g5 a5 g5 e5 d5 c5 g4}%8",
  "{d5 g5 b5 g5 d5 c5 b4 g4}%8",
  "{c5 e5 g5 a5 g5 e5 d5 c5}%8",
  "{a4 c5 e5 g5 e5 d5 c5 a4}%8",
]

const guitar_patterns = [
  "x ~ x ~ x ~ x ~",
  "~ x ~ ~ ~ x ~ ~",
  "x ~ ~ x x ~ ~ x",
]

// --------------------- INSTRUMENTS -------------------------

// BASS
<bass>bassline:
note(pick(basslines, bass))
.sound("supersaw")
.lpf(750)
.lpenv(3.0)
.adsr("0:0:.34:.14")
.room(0.28)
.postgain(pick(gain_patterns, pattern))

// HOOK
<melody>lead_hook:
note(pick(hook_arp, "<0 1 2 3>/2"))
.sound("supersaw")
.lpf(3000)
.lpenv(2.0)
.adsr("0:0:.3:.18")
.room(0.45)
.postgain(0.9)
.rarely(jux(rev))

// GUITAR
<guitar>guitar_strums:
stack(
   s("acg:0").struct(pick(guitar_patterns, 0))
  .gain(0.4)
  .room(0.25)
  .speed(1.02),

  s("acg:2")
  .struct(pick(guitar_patterns, 1))
  .gain(0.33)
  .room(0.22)
  .speed(0.98)
)

// ------------------------- DRUMS -------------------------
<drums1>drums:
stack(
   s(pick(drum_structure, pattern)).bank("RolandTR808")
  .postgain(2.0),

  s("~ cp ~ cp").bank("RolandTR808")
  .postgain(1.0),

  s("hh*8").bank("RolandTR808")
  .gain(0.6)
  .room(sine.range(0.1,0.3))
  .postgain(0.8),

  s("~ sh ~ ~").bank("RolandTR808")
  .postgain(0.4)
  .lpf(7000)
  .speed(0.95),

  s("lt ~ lt ~").bank("RolandTR808")
  .postgain(0.55)
)

<drums2>drums2:
 s("tech:5")
.struct("~ ~ ~ ~ x ~ ~ ~")
.postgain(2)
.pcurve(2)
.pdec(1)

all(x => x.log())
// @version 1.0 — “MySong”
`;
