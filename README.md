# Stefan Control Studio - README

## Overview

Stefan Control Studio is a music controller that allows user to adjust and play music with different pre-settings in real-time using the Strudel.cc

## Control Descriptions

### Top Bar Controls

**Load Button** (Top Left)

- Loads previously saved settings from browser localStorage
- Automatically applies all saved parameters including BPM, volume, reverb, drum patterns, bass lines, instrument combinations, effects, and drum kit selection

**Save Button** (Top Right - Green)

- Saves current session settings to browser localStorage
- Preserves all mixer settings, pattern selections, and effect states for future reviews

### Status Bar

Displays three key metrics:

- **BPM**: Current tempo (beats per minute) - default 140
- **Status**: Shows "Playing" (green) or "Stopped" (red)
- **Volume**: Current master volume level (0.0 to 3.0) - default 0.8

### Main Control Buttons

**Stop Button** (Red - Left)

- Stops playback immediately
- Updates status indicator to "Stopped"

**Play Button** (Green - Center)

- Starts/resumes playback with current settings
- Updates status indicator to "Playing"

**Settings Button** (Yellow - Right)

- Preprocesses and compiles the current Strudel code

### Mixer Panel

**Volume Slider**

- Range: 0.0 to 3.0
- Controls output volume
- Real-time adjustment

**Tempo Slider**

- Range: 40 to 240 BPM
- Adjusts playback speed
- Changes reflect immediately in the status bar and music

**Reverb Slider**

- Range: 0.0 to 10.0
- Controls reverb/room effect intensity

### Drum Pattern Section

Three preset drum patterns:

- **Steady**: Basic 4/4 beat pattern
- **Up & Down**: Up and down beat pattern
- **Complex**: Complex beat pattern

Click any button to switch patterns instantly.

### Bass Section

Two bass line options:

- **Smooth**: Melodic, flowing bass line
- **Drive**: Punchy bass line

### Instrument Combinations

Pre-configured mute/solo combinations:

- **All**: All instruments active (default)
- **BeatsOnly**: Drums only
- **BassDrum**: Bass and drums only
- **NoDrums**: All instruments except drums
- **BassOnly**: Bass only
- **ArpOnly**: Arpeggiated synth only
- **DrumsOnly**: Drums only
- **Drums2Only**: Secondary drum pattern only

### Special Effects

Toggle switches for additional effects:

- **Add distortion**: Adds grit and harmonic saturation
- **Skip Notes**: Creates a stuttering/glitch effect by randomly skipping notes
- **Reduce Bit**: Bit-crushing effect

### Drum Kit Selection

Four drum sound banks:

- **Classic**: RolandTR808
- **Acoustic**: AcousticKit
- **Vintage**: LinnDrum
- **Retro**: OberheimDmx
- **Digital**: RolandTR606

### Accordians

**Input** (Expandable)

- Displays the raw Strudel code
- Code updates immediately when controls are changed
- Can be manually edited (use Settings button to apply changes or play directly)

**Editor/Output** (Expandable)

- Alternative view of the Strudel code with more colors
- Users can modify patterns directly

**Canvas Display** (Expandable)

- Visual piano roll representation
- Shows note patterns

## Usage Guidelines

### How to run the program

1. Clone the repository: `git clone https://github.com/Stefan-Phan/WebTechA2.git` and then `cd A2`
2. Install dependencies: `npm install`
3. Run the program: `npm start`
4. Open the web browser and navigate to: `http://localhost:3000`

### Getting Started

1. Click the green **Play** button to start with default settings
2. Adjust **Mixer Panel** sliders to set your preferred volume, tempo, and reverb
3. Try different **Drum Patterns** and **Bass** options
4. Try various **Instrument Combinations** to create different textures

### Music Source

- The song from Algorave Dave's code: https://www.youtube.com/watch?v=ZCcpWzhekEY

## Music Video Link

Video Link:
