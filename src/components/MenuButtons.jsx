
function MenuButtons({ activeBtn, onClick }) {
    
    return (
        <>
            <div className="btn-group" role="group" id="menuBtns" aria-label="Menu buttons">
                <button className="btn" id="helpBtn" onClick={(e) => onClick(e["target"].id)}>Help</button>
                <button className="btn" id="controlBtn" onClick={(e) => onClick(e["target"].id)}>Control</button>
                <button className="btn" id="testBtn" onClick={(e) => console.log(e["target"].id)}>test</button>
                
                {/* {this.state.buttons.map((menuBtn, i) =>
                    <li className='list-group-item' key={i} data-id={menuBtn.id}>{menuBtn.name}
                        <button onClick={() => this.setMenu(menuBtn.id)}>Control</button>
                        <button onClick={() => this.setMenu(menuBtn.id)}>Help</button>
                    </li>
                )} */}
                {/* <nav className="nav">
                    {/* <button className="btn btn-lg nav-link" id={"control"} onClick={() => this.setMenu({id})}>Control</button>
                    <button className="btn btn-lg nav-link" id={"help"} onClick={() => this.setMenu({id})}>Help</button>
                    <button className="btn nav-link">aaa</button>
                </nav> */}
            </div>
        </>
    )
}

export default MenuButtons;