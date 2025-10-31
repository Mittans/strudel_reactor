
const defaultBtn = "controlBtn"; // this adds... almost nothing except for very minor and rare debug cases but I like it
let lastBtnId = defaultBtn;
let targetBtnId = null;

function MenuButtons({ activeBtn, onClick }) {
    function handleMenuButton(e) {
        targetBtnId = e["target"].id;
        lastBtnId = (lastBtnId == null) ? e["target"].id : lastBtnId;
        document.getElementById(lastBtnId).className = "btn btn-light";
        document.getElementById(targetBtnId).className = "btn btn-secondary";
        onClick(e["target"].id)
        lastBtnId = e["target"].id;
    }

    return (
        <>
            <div className="btn-group menu_buttons" role="group" id="menuBtns" aria-label="Menu buttons">
                <button className={`btn btn-${(defaultBtn == "helpBtn") ? "secondary" : "light" }`} id="helpBtn" onClick={(e) => {
                    handleMenuButton(e);
                    }}>Help</button>
                <button className={`btn btn-${(defaultBtn == "controlBtn") ? "secondary" : "light" }`} id="controlBtn" onClick={(e) => {
                    handleMenuButton(e);
                    }}>Control</button>
                <button className={`btn btn-${(defaultBtn == "consoleBtn") ? "secondary" : "light" }`} id="consoleBtn" onClick={(e) => {
                    handleMenuButton(e);
                    }}>Console</button>
                <button className={`btn btn-${(defaultBtn == "testBtn") ? "secondary" : "light" }`} id="testBtn" onClick={(e) => {
                    handleMenuButton(e);
                    }}>test</button>
            </div>
        </>
    )
}

export default MenuButtons;