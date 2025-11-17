

function Storage({ volume, tempo, tracks, setVolume, setTempo, setTracks }) {
    const saveSettings = () => {
        const settings = {
            volume: volume,
            tempo: tempo,
            tracks: tracks
        };
        localStorage.setItem('musicSettings', JSON.stringify(settings));
        alert('Settings saved!');
    };

    const loadSettings = () => {
        const saved = localStorage.getItem('musicSettings');
        if (saved) {
            const settings = JSON.parse(saved);
            setVolume(settings.volume);
            setTempo(settings.tempo);
            setTracks(settings.tracks);
            alert('Settings loaded!');
        } else {
            alert('No saved settings found');
        }
    };

    return (
        <div className="container p-4 rounded-4 shadow-sm glass-card mt-4">
            <h5 className="text-center mb-3 fw-bold text-light">Save/Load</h5>
            <div className="d-grid gap-2">
                <button className="btn btn-success" onClick={saveSettings}>
                    Save Settings
                </button>
                <button className="btn btn-info" onClick={loadSettings}>
                    Load Settings
                </button>
            </div>
        </div>
    );
}

export default Storage;

//give out a section/info about what other components are doing
//bootstrap 

//To create a meaningful function, save the files and load files
//creates a own music in storage folder with a new file with a new name.js, user can input it.

//search on a storage folder and return the js file - searches what is in the storage, rn the search returns music.js and tunes.js, to know what we have rn
//display the files on the UI 
//select the file you want to load
//load the file into the editor in the StrudelDemo.jsx component


//function PlayButtons({ onPlay, onStop }) {
//do the same thing for the setSong data 
// <PlayButtons onPlay={handlePlay} onStop={handleStop} />  can do the same for the music or any new file. 

//all this is for loading music from storage folder to the editor.

//Saving the new music 

//same logic as above about onplay onStop for reading the current music.
//use preprocess and songData to save the current music into a new file in the storage folder.
//preprocess will update the current data and process that and saves it into a new file in the storage folder.
//don't forget to import the name of the new file in the storage folder and also StrudelDemo.jsx component.

//new file might javascript and js extension, but to match the requriement, need to use Json .

//export const stranger_tune = `setcps(140/60/4) file will need to be stored like this, same format and replace the stranger_tune with the new file name.

//save and load music, can switch between different music files stored in the storage folder.
//save music - inut a new name and save it.
//load music = select from the list of files in the storage folder and load it into the editor.

//UI - 2 buttons - Save Music, Load Music
//on clicking the Load Music button, a modal will open up with the list of files in the storage folder.
//user can select the file they want to load and on clicking load button, the selected file will be loaded into the editor.
// function PlayButtons({ onPlay, onStop }) {



