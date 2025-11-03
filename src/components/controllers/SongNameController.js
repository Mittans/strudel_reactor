import {useState, useEffect} from "react";
import { CRUDManager } from '../buttons/CRUDManager';

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

export function SongNameController(props) {
    const [musicList, setMusicList] = useState([]);

    useEffect (()=> {
        setMusicList(getAllMusic())
    })

    // Function to load the text song from local storage.
    const handleLoad = () => {
        const song = document.getElementById("songName").value
        const savedItem = localStorage.getItem(song);

        if (savedItem) {
        props.setText(JSON.parse(savedItem));
        alert("Loaded from local storage");
        } else {
        alert("No saved text found");
        }
    };

    // Function to delete item from the local storage.
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

    return (
        <div className='flex p-4'>
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
            
            <CRUDManager  
            handleDelete={handleDelete} 
            modalOpenControl={props.modalOpenControl} 
            handleLoad={handleLoad}
            />
        </div>
    );
}

