import { useEffect } from 'react';
import { stranger_tune } from '../tunes';
import { useState } from 'react';

function Preprocess(){

    const [code, setCode] = useState('');

    useEffect(() => {
        setCode(stranger_tune);
    }, []);
    
    return (
        <>
            <div style={{ maxHeight: '80vh', overflowY: 'auto'}}>
              <label htmlFor="proc" className="form-label">Text to Preprocess:</label>
              <textarea className="form-control" rows="15" id="proc" value={code} onChange={(e) => setCode(e.target.value)} ></textarea>
            </div>
        </>
    )
}

export default Preprocess