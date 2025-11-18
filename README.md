
# 'Project Title

Strudel Live Coding – React Application

### Overview

This project is a React-based application that uses React concepts to live-code music in Strudel.
It includes components, state, event handling, and a clear UI to make the music-coding experience simple and interactive.

### Getting Started

In the project directory, you can run:

### npm install

Installs all required dependencies listed in package.json.

### npm start

Runs the app in the development mode.
Open <http://localhost:3000> to view it in your browser.

The page automatically reloads when you make changes.
You may also see lint errors in the console.

### npm run build

Builds the app for production.
The build folder is optimised, minified, and ready for deployment.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Project Components Explanation

**Play Button**  
Starts Strudel audio playback.  
Activates the browser audio context so that sound can be heard.  
Compiles and runs the current Strudel code from the editor.

**Stop Button**  
Stops any currently playing Strudel patterns.  
Useful when testing multiple ideas quickly.

**Strudel Code Editor (StrudelMirror)**  
Main area where Strudel code is written and edited.  
Supports live editing of patterns such as drums, basslines, and other sequences.  
Changes in the editor only take effect after pressing the Play button again.

**Process Buttons**  
Automatically insert predefined patterns
Apply simple formatting or cleaning to the Strudel code such as spacing or structure.  

**Preprocess Button**  
Runs simple text-based preprocessing on the editor content before it is sent to Strudel.  

**Volume Slider**

The slider controls the output gain from 0% to 100%. By default it's set to 50%
The five preset buttons 0%, 25%, 50%, 75%, 100% instantly set the slider to common values.

**SetTempo Input**

This input box lets the user set the tempo of the Strudel playback.
The default value is 120, user can also increment by 10 steps by clicking on the top arrow.
Entering a new number updates the pattern’s speed.

**Track Toggles**
These switches allow the user to turn instrument layers on or off.
Drum 2 – Enables or disables the secondary drum pattern.
Drums – Main drum line.
Bass – Bassline layer.
By default, all tracks start turned off until the user activates them.

**Mute/ Unmute Button**
The mute button instantly silences all audio output.
The icon changes to show mute/unmute state.
When unmuted, the volume returns to the slider’s it's default value.

**Shuffle Button (Yellow Shuffle Icon)**
Randomises the current pattern. The Shuffle button doesn’t create completely random values.
Instead, it only shuffles between preset patterns and values that I have been defined in the code.
This makes sure the music still sounds controlled and musical, and it also prevents any unexpected values that could break the Strudel code.

**Reset Button (Blue Reload Icon)**

Restores default settings (tempo, volume, track toggles).
Removes any randomisation applied by Shuffle.
Useful for returning the app to the inital state.

**Save / Load Settings**
Save Settings Button Stores the current tempo, volume, and track toggle states. Helps users return to a previous configuration quickly.
Load Setting Restores the saved configuration and applies it to the UI and Strudel patterns.

**D3 Graph Component**  
The D3 graph shows live gain values from Strudel using a simple line graph.
My console-monkey-patch.js sends gain data like the 0.5 gain to the component through a d3Data event.
The D3.jsx file listens for this event, stores the numbers in React state, and D3 draws a real-time updating line graph as the music plays.

High points = louder parts
Low points = quieter parts

The graph only updates when Strudel outputs gain values

This provides a simple visual connection to the audio.

**Video Link**  
