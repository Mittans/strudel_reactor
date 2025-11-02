
const defaultBtn = "controlBtn"; // this adds... almost nothing except for very minor and rare debug cases but I like it
let lastBtnId = defaultBtn;
let targetBtnId = null;

function MenuButtons({ activeBtn, onClick, theme }) {
    function handleMenuButton(e) {
        targetBtnId = e["target"].id;
        lastBtnId = (lastBtnId == null) ? e["target"].id : lastBtnId;
        document.getElementById(lastBtnId).className = "btn btn-unselected";
        document.getElementById(targetBtnId).className = "btn btn-selected";
        onClick(e["target"].id)
        lastBtnId = e["target"].id;
    }

    return (
        <>
            <div className="btn-group menu_buttons bg-menuBtns" role="group"  id="menuBtns" aria-label="Menu buttons">
                <button className={`btn btn-${(defaultBtn === "helpBtn") ? "selected" : "unselected" }`} id="helpBtn" onClick={(e) => {
                    handleMenuButton(e);
                    }}>Help</button>
                <button className={`btn btn-${(defaultBtn === "controlBtn") ? "selected" : "unselected" }`} id="controlBtn" onClick={(e) => {
                    handleMenuButton(e);
                    }}>Controls</button>
                <button className={`btn btn-${(defaultBtn === "consoleBtn") ? "selected" : "unselected" }`} id="consoleBtn" onClick={(e) => {
                    handleMenuButton(e);
                    }}>Console</button>
                <button className={`btn btn-${(defaultBtn === "sourceBtn") ? "selected" : "unselected" }`} id="sourceBtn" onClick={(e) => {
                    handleMenuButton(e);
                    }}>Source</button>
                <button className={`btn btn-${(defaultBtn === "unusedBtn") ? "selected" : "unselected" }`} disabled id="unusedBtn" onClick={(e) => {
                    handleMenuButton(e);
                    }}>Placeholder</button>
                <button className={`btn btn-${(defaultBtn === "unusedBtn") ? "selected" : "unselected" }`} disabled id="unusedBtn" onClick={(e) => {
                    handleMenuButton(e);
                    }}>Placeholder</button>
            </div>
        </>
    )
}

export default MenuButtons;