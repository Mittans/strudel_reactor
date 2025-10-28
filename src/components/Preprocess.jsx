import { useEffect, useState } from 'react';
import { stranger_tune } from '../assets/tunes';
import '../css/Preprocess.css';

function Preprocess({ onChange, value }){

    // const [code, setCode] = useState("");

    // useEffect(() => {
    //     setCode(stranger_tune);
    //     onChange?.(stranger_tune);
    // }, []);
    
    const handleChange = (e) => {
        // setCode(e.target.value);
        onChange?.(e.target.value);
    };

    return (
        <>
            <div style={{ maxHeight: '80vh', overflowY: 'auto', maxWidth: '100%'}}>
              <label  id='procLabel' htmlFor="proc" className="form-label fw-bold">Text to Preprocess:</label>
              <textarea className="form-control" rows="15" id="proc" value={value} onChange={handleChange} ></textarea>
            </div>
        </>
    )
}

export default Preprocess