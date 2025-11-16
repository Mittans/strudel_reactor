import DjControls from "./DjControls";
import { useState } from "react";

function EditorArea() {

    // Start with 1
    const [cards, setCards] = useState([0]);

    // Add a card
    const addCard = () => {
        setCards(prev => [...prev, prev.length]);
    }

    // Delete a card
    const deleteCard = (obj) => {
        setCards(prev => prev.filter(cardObj => cardObj !== obj));
    }

    return (
        <>
            <div className="col-md-12">
                {cards.map((obj) => (
                    <div key={obj} style={{ marginBottom: "45px" }}>
                        <DjControls/>
                        <button className="btn btn-danger w-100" style={{ marginTop: "10px"}} onClick={() => deleteCard(obj)}>Delete</button>
                    </div>
                ))}
                <button className="btn btn-primary w-100" onClick={addCard}> + </button>
            </div>
        </>
    )
}

export default EditorArea;