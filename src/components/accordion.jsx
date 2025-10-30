import { useState } from 'react';

function Accordion ( {component, text} ) {
    const [isHidden, setIsHidden] = useState(false);

    const toggleHidden = () => {
    setIsHidden(!isHidden);
    };

    return (
        <>
            <button onClick={ toggleHidden }>Show {text}</button>
            <div style={ { display: isHidden ? 'none' : 'block' } }>
                {component}
            </div>
        </>
    );
}

export default Accordion;