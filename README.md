# Midnight in Motion - React + Strudel Music Visualiser
This project showcases an interactive music performance tool built using React, Strudel, and D3.js. 
It combines real‑time audio manipulation with a dynamic UI, JSON state handling, preprocessing logic, and a live gain visualisation graph. 
The entire experience is designed around responsiveness, interactivity, and a stylised cyber‑aesthetic to enhance user engagement. 
The song used in this project, titled *Midnight in Motion*, is an original composition created specifically for this assignment.

## How to Run This Project

### 1. Install all dependencies
```bash
npm install
```

### 2. Start the development server
```bash
npm start
```

http://localhost:3000

---

# Controls — What They Do
### Volume Slider

Controls the master volume of the entire track live.

### Speed (CPM) Input

Accepts values 60–200.

If the user enters an invalid value, a warning appears and it resets back to 120.

### Instrument Toggles

Each toggle directly enables or disables a section of the composition:

Drums1 – Main 808 drum pattern

Drums2 – Tech/industrial filler layer

Bass – Supersaw bassline

Melody – Arpeggiated supersaw hook

Guitar – Plucked strumming pattern stack

### Playback Buttons

Play – Plays the fully processed Strudel code

Stop – Stops all audio instantly

Preprocess – Loads raw code into the editor

Proc & Play – Preprocess + immediately play

Save & Load Settings (JSON)

Saves the full UI state (toggles, CPM, volume) as JSON

Loads those JSON settings back into the UI

### Hotkeys

K → Play

L → Stop

H → Toggle Drums1

J → Toggle Bass

---

# Quirks & Usage Guidelines
- CPM validates on blur.
- D3 updates every 400ms.
- JSON stored locally.

---

# D3 Graph Feature
Real‑time gain visualiser using Strudel `.log()`.

---

# JSON Handling Feature
Used for Save/Load presets + UI JSON viewer.

---

# Demonstration Video
(Add your link)

---

# Song Attribution
Original composition: **Midnight in Motion**

---

# GIGA HD Bonus Claim
My goal was to create a track that feels energetic, layered, and reactive to the UI controls, 
so the song was built from the ground up with React interactivity in mind. 
I built the beat by experimenting with sounds, rhythms, and melodies until it started feeling fun and energetic.

## Creative Process
- I started by creating my own drum pattern and adjusting it until it felt right.

- Then I wrote a bassline that matched the rhythm and gave the song a smooth flow.

- The melody came next, where I tried different note shapes until the hook sounded catchy.

- The guitar layer was added last to give the track a warmer texture.

- I kept testing everything with my React controls to make sure turning things on and off actually changed the sound in a noticeable way.


---

# Ready for Submission

