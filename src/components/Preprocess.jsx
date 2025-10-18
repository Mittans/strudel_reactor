import { useEffect, useState } from 'react';
import { stranger_tune } from '../tunes';

function Preprocess({ onChange }){

    const [code, setCode] = useState("");

    useEffect(() => {
        setCode(stranger_tune);
        onChange?.(stranger_tune);
    }, []);
    
    const handleChange = (e) => {
        setCode(e.target.value);
        onChange?.(e.target.value);
    };

    return (
        <>
            <div style={{ maxHeight: '80vh', overflowY: 'auto'}}>
              <label htmlFor="proc" className="form-label fw-bold">Text to Preprocess:</label>
              <textarea className="form-control" rows="15" id="proc" value={code} onChange={handleChange} ></textarea>
            </div>
        </>
    )
}

export default Preprocess