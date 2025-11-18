# **Strudel Demo – React Based Music Processor**

This project is a Strudel-based music web-app built with **React**, which allows users to edit a Strudel tune,
apply live effects, and control playback with an intuitive UI. It includes a JSON configuration for the setting, instrument
toggles, sliders, live processing, and sound graph visuals using a D3 element.

## **Features**

### **1. Pre-Processing & Live Editing**
- A large editor where users can modify the base Strudel code.  
- Changes are automatically processed and reflected in playback.  
- *Process* and *Process & Play* buttons for manual control.
- *Play and Stop* buttons to start and stop strudel tune.

### **2. DJ Controls Panel**
The right panel contains interactive controls:
- **cpm (cycles per minute)** slider  
- **Main volume** slider  
- **Instrument toggles** for `s1`, `d1`, `d2`  
- **Per-instrument volume(intensity) sliders**  
- **Echo slider** for additional effects  
- All changes auto-update while playing.

### **3. JSON Save & Load System**
Users can:
- **Save** their current config which stores all sliders/toggles in JSON  
- **Load** it loads JSON config saved in the textbox under it and restores all settings  
- Useful for presets and to experiment things or to suddenly transition to an set of effects

### **4. Visualisation**
A **A D3-powered gain graph that updates in real-time while the song plays.**

## **How It Works (High-Level Overview)**
1. **React state** stores musical parameters:  
   `cpm`, `volume`, `s1`, `d1`, `d2`, `s1Vol`, `echo`, etc.
2. `processSongText()` replaces placeholders inside the Strudel tune:  
   ```
   <s1>, <d1>, <d2>, <cpm>, <volume>, {volumeS1}, <echo>, etc
   ```
   Every time something changes, the code is regenerated, I have such options for everything that needs to change in the strudel repl
3. StrudelMirror evaluates the processed code and plays the audio.
4. The DJ Controls panel updates the usestates in app.js and on their change the song updates immediately using an useEffect().
5. JSON save/load simply serialises and restores the state.
6. The useEffect being used, uses a variable isPlaying to reflect changes when playing 

## **Project Structure**
- all the components are in the components folder with one dedicated css styling file.
- DJcontrols has all the control panel features like vol, toggle instrument, cpm, etc.
- PlayButtons have the play and stop buttons.
- ProcButtons have the preProc and Proc&Play buttons.
- PreProcessTextarea has the text area for inputting preprocessing text.
- SoundGraph has the d3 graph reading for log().
- Everything runs from app.js as the main brain.
- tunes.js has the strudel tune that we want to play around by default.

## **How to Run**
```
npm install
npm start
```
Open:  
**http://localhost:3000**

## **Author**
- Hrishikesh Anjaria
- anjhy002@mymail.unisa.edu.au