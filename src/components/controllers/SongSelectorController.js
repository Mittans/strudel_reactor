import {useState, useEffect} from "react";
import { CRUDController } from './CRUDController';
import { IoMdSettings } from "react-icons/io";

// Function allows to get all music in the local storage.
export function getAllMusic(){
  const musicList = [];
  for (let i = 0; i < localStorage.length; i++) {
    const musicSong = localStorage.key(i);
    if (musicSong !== "codemirror-settings") {
      musicList.push(musicSong);
    }
    
  }

  return musicList
}

export function SongSelectorController({
    setText,
    text,
    handleOpenSetting,
    isOpenSetting,
    modalOpenControl
}) {
    const [musicList, setMusicList] = useState([]);

    useEffect (()=> {
        setMusicList(getAllMusic())
    })

    // Function to load the text song from local storage.
    const handleLoad = () => {
        const song = document.getElementById("songName").value
        const savedItem = localStorage.getItem(song);

        if (savedItem) {
        setText(JSON.parse(savedItem));
        alert("Loaded from local storage");
        } else {
        alert("No saved text found");
        }
    };

    // Function to delete song from the local storage.
    const handleDelete = () => {
        const song = document.getElementById("songName").value;
        const deletedItem = localStorage.getItem(song);
        if (deletedItem) {
            localStorage.removeItem(song);
            alert("remove from local storage");
        } else {
            alert("No deleted item found");
        }

        window.location.reload(); 
    };

    // Function to save song if already exisits
    const handleSave = () => {
        const song = document.getElementById("songName").value;
        const savedSong = localStorage.getItem(song);
        if (savedSong) {
            localStorage.setItem(song, JSON.stringify(text));
            alert("Succeccfully save song");
        } else {
            alert("No song is found. Please add it first.");
            modalOpenControl();
        }
    };

    return (
        <div className='flex p-4'>

            {/* List all songs that exist in the local storage */}
            <select
            className="text-2xl text-center font-bold bg-gray-200 text-black w-40 rounded-lg" 
            htmlFor="exampleFormControlTextarea1" 
            id="songName"
            >
                <option value ="" className="text-sm text-center font-bold bg-gray-200 text-black w-40 rounded-lg" > Untitled </option>
                {musicList.map((obj) => (
                    <option 
                    className="text-sm text-center font-bold bg-gray-200 text-black w-40 rounded-lg"
                    value={obj}> 
                    {obj} 
                    </option>
                ))}
            </select>
            
            <div className="flex items-center">

                {/* Setting Icon */}
                <button onClick={handleOpenSetting}>
                    <IoMdSettings 
                        className={`text-5xl mx-3 duration-500 
                        ${isOpenSetting ? ("bg-black text-yellow-500 rounded-full hover:text-yellow-700 open-setting-spin") : 
                        ("close-setting-spin hover:text-gray-700")}`}
                    />
                </button>
                
                {/* Add, Delete, Load, and Save inside the controller. */}
                <CRUDController 
                handleDelete={handleDelete} 
                modalOpenControl={modalOpenControl} 
                handleLoad={handleLoad}
                handleSave={handleSave}
                isOpenSetting={isOpenSetting}
                />
            </div>
        </div>
    );
}

