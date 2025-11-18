# 25SP5 INFT2064 Web Tech React Assignment

Student: Gaogang Xing  
ID: 110426091  
Username: xingy001

## Controls Overview
Below is a list of all features in this project.



### 1. DJControls.jsx
Global feature component. Holds all local state and central handlers, and coordinates updates for all DJ sub-components. All files in the DJcomponents folder are referenced here.



### 2. CPMControls.jsx
Controls the global CPM value. Uses a controlled input number to adjust CPM speed and pushes updates upward to the parent. Also includes quick CPM change buttons.



### 3. KeyShiftControl.jsx
Controls the bassline and ARP track key values. Updates add() in the song text to modify the key. Provides quick-select buttons to change keys.



### 4. VolumeControl.jsx
Controls the global post-volume value. Implemented with a slider that adjusts gain and passes the updated level to Strudel output handlers.



### 5. TrackControls.jsx
Handles per-track toggles such as instrument on/off. Uses button groups and state flags mapped to tag replacements. In tunes.js, the helper method muteIf() determines whether a track is enabled.



### 6. EffectControls.jsx
Master effect panel containing Reverb, Delay, Distortion, LPF, HPF, Chorus, and Wow. Each effect uses controlled checkboxes and sliders and dispatches values upward.



### 7. SettingControls.jsx
Uses dropdown buttons to apply sound-effect presets. Provides different preset styles to quickly change overall effect settings.



### 8. D3Graph.jsx
Displays a real-time D3 graph driven by Strudel log() values. Listens to the streaming data array and re-renders the chart continuously. Mainly displays drum-track gain() changes.



### 9. D3GraphScope.jsx
Displays live track statements while the song is playing. A scoped oscilloscope-style graph focusing on waveform visualization. Updates on each audio tick via requestAnimationFrame.



### 10. JsonSave and JsonLoad
Saves and restores song settings as a JSON file. Implemented using JSON.stringify() and JSON.parse() tied to buttons.



### 11. PreprocessTextarea.jsx
Displays the preprocess text area following the course implementation structure.



### 12. PlayButton.jsx
Controls starting and stopping of the song playback.



### 13. App.css
Defines all UI styling rules including theme colors, layout spacing, control visuals, and responsive design. Loaded globally for consistent appearance.



### 14. SwitchTheme
Controls theme switching. Default is dark mode; can toggle between light and dark themes.



## AI Usage Guidelines
Declaration of AI-generated content used in this project.

### 1. SettingControls Preset List
AI was used to generate initial preset strings for sound effects.

- Location: SettingsControls.jsx, line 23 to line 185  
- Tool: OpenAI ChatGPT 5.0  
- Input prompt: "Based on my effect functions, give me preset values that resemble realistic music styles."  
- Output example: const PRESETS = {
                    pop: [
                        {
                            name: "Bright Studio",
                            reverb: { enable: true, amount: 0.30 },
                            delay: { enable: true, amount: 0.18 },
                            distortion: { enable: false, amount: 0.10 },
                            lowpass: { enable: true, freq: 6200 },
                            highpass: { enable: true, freq: 180 },
                            chorus: { enable: true, amount: 0.28 },
                            wow: { enable: false, amount: 0.5 }
                        },......


## Demonstration Video
Video Link:  
https://mymailunisaedu-my.sharepoint.com/:v:/g/personal/xingy001_mymail_unisa_edu_au/IQBNujWrbLFOQ6BMUB1Q1ulyAXpOLjcXBYUbcvKNrlER2K0?nav=eyJyZWZlcnJhbEluZm8iOnsicmVmZXJyYWxBcHAiOiJPbmVEcml2ZUZvckJ1c2luZXNzIiwicmVmZXJyYWxBcHBQbGF0Zm9ybSI6IldlYiIsInJlZmVycmFsTW9kZSI6InZpZXciLCJyZWZlcnJhbFZpZXciOiJNeUZpbGVzTGlua0NvcHkifX0&e=fdB79A