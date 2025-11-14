**Strudel Music Demo**
A web-based music player built with React and Strudel that provides real-time control over multiple instruments, tempo, and volume.

**Features:**

**Control Instruments with individual sliders**
Toggle each individual instruments on/off in real-time:

__Instruments include:__
Baseline
MainArp
Drums
Drums2

**Audio Controls** 

__Volume Slider__

Visual Control: Interactive D3.js slider for precise volume adjustment
Range: 0% (mute) to 100% (maximum volume)
Gain Display: Shows both percentage and decimal gain value (0.0 - 1.0)
Volume History Graph: Real-time line graph

__BPM Control__

__Tempo Adjustment: Set beats per minute from 1 to 300 BPM__
Default: 140 BPM
Real-time Updates apply immediately during playback

**Playback Controls**
__Play Button__
Starts audio playback with current settings
All instruments, volume, and BPM settings are applied

__Stop Button__
Stops audio playback immediately
Settings are preserved for next playback

**Quick Actions**
__Mute/Unmute All__

Mute All Button: Mutes all four instruments
Unmute All Button: Unmutes all instruments to active state
Active Counter: Shows how many instruments are currently active (e.g., 2 / 4)