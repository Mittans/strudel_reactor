# **Strudel_React_Assignment:**

The song being used in the strudel is the song that was provided in the tune.js. The changes to tune.js include adding the tags that are used by other components to make changes to the song or tune.

## **Video:**

#### Video Link:

https://mymailunisaedu-my.sharepoint.com/:f:/g/personal/corjy025_mymail_unisa_edu_au/IgAzNewWx_waT4YLv_HOoe_BAY_FQyFIEDGMoI9ND3sYHJ4?e=HYnjZe

#### Video Design Decisions:

The video was created in ClipChamp after recording the screen and music on snipping tools. ClipChamp allowed me to record myself and then overlap the videos so that they play at the same time. I did the video this way as recording them together resulted in either the sound from me speaking or the sound from the strudel being cut off. I chose to place the video of me in the bottom right hand corner as this impacted the view of the component demonstrations the least.

## Components:

### Track Volume and Filter button:

The track volume and filter buttons at the top of the navigation bar are implemented using scrollSpy and tabs. They scroll to the section of the navigation that holds the control for the selected section. For example, when track volume is clicked it will scroll to the track volume header which holds the volume controls for each individual track.

### Save Button:

The save button holds a modal that allows the user to name the file that holds the json string. If the user does not provide a name it defaults the name of the file to "data". It saves all of the information held in the strudel into the json string. Additionaly the state of all other controls except play, stop, preprocess and proc and play is stored in the json string.

### Load Button:

The load button loads a selected json file into the strudel. This however, does not impact the state of the controls on the navigation bar except for the mute state. If the json states that the song is in a mute state when the song is loaded the mute toggle button will show that it is muted.

### Processor:

The processor stores all the information about the songs and tracks including all the tags that are used to change the song in the strudel.

### Strudel:

The strudel shows the components or tracks that make up the song including the notes or sounds that make up the track. It shows the current state of the track.

### Graph:

The graph dynamically changes while the song is playing. It shows the gain of the song or keypoints within the song.

### Reverb:

Reverb simulates the decay of sound from the song as it reflects off the surfaces of a given song.

#### Room:

Room provides a space of a given size for sound waves to vibrate off.

#### Decay:

Decay represents the time that it takes for the reverb effect to fade away.

#### Fade:

The fade determines how long the reverb effect occurs for until it begins to fade away.

#### Low Pass:

The low pass removes any unwanted high frequency sounds.

#### Sustain:

Sustain controls how long a sound is audible for after the note or sound has been played.

### Track Volume:

Track Volume holds a control for each individual track in the song that is being played. It is used to change the volume of a selected track rather than the volume of the whole song.

### Volume:

Volume is a control that changes the volume of the whole song. However, it does overwrite any volume changes that have been made in the track volume control.

### Mute:

The mute prevents the song from playing so that it appears like the song is muted when the play button is pressed.

### Filters:

#### Low Pass:

The low pass allows lower frequencies than previously read to pass through while reducing the higest frequency allowed through.

#### Medium Pass:

The medium pass allows frequencies in a certain range to pass through while removing frequencies that are below or above the given range.

#### High Pass:

The high pass allows higher frequencies than previously read to pass through while removing the lower frequencies that are allowed through.

### Play:

The play button plays the song that is stored in the strudel.

### Preprocess:

The preprocess button processes the information provided in the processor so that it is ready to be played.

### Proc and Play:

Proc and Play processes the information in the processor and then plays the song stored in the strudel.

### Stop:

Stop stops the music that is being played from playing.

### Navigatiuon:

Stores all the components that are displayed in the navigation so that they can be displayed in an ordered format.

## Note:

All the components that are held in the navigation and the reverb process the change as the change is being completed. Everytime a change is made the user will need to press stop and play for the change to be heard.

## AI Usage:

No AI was used for the production of this assignment.
