import { useState } from 'react';
import { BsChevronDown } from "react-icons/bs";
import { BsChevronUp } from "react-icons/bs";

function Accordion ( {component, text} ) {
    const [isHidden, setIsHidden] = useState(false);

    const [buttonText, setButtonText] = useState('Hide ' + text);
    const [buttonIcon, setButtonIcon] = useState(<BsChevronUp />);

    const toggleHidden = (event) => {
        setIsHidden(!isHidden);

    };

    const handleClick = () => {

        if (!isHidden){
            setButtonText('Show ' + text);
            setButtonIcon(<BsChevronUp />)
        }
        else {
            setButtonText('Hide ' + text);
            setButtonIcon(<BsChevronDown />)
        }
    };

    return (
        <>
            <button onClick={ () => {toggleHidden(); handleClick();} } className='btn btn-secondary w-100 text-start rounded-top-1 rounded-bottom-0' >{buttonText}<span className='float-end'>{buttonIcon}</span></button>       
                <div style={ { display: isHidden ? 'none' : 'block' }}>
                    {component}
                </div>
        </>
    );
}

export default Accordion;