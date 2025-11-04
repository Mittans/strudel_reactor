import base from '../BaseSettings';

function ThemeDropdown ({ themeDropdown, setThemeDropdown, onHandleTheme}) {
    const themesList = [ "Debug", "Light", "Dark" ];
    // whats the option and whats the id?
    return (
        <>
            <div className="btn-group input-group mb-4 flex-auto">
                    <span className="input-group-text menu_label_subject" aria-expanded="false">Theme</span>
                    <button className="form-control menu_label_value" style={{ textAlign: "left" }} id="theme_dropdown" data-bs-toggle="dropdown">{themeDropdown}</button>
                    <ul className="dropdown-menu" onClick={(e) => {
                        // because of how this is catching them all, this technically counts the dropdown box itself when expanded
                        if (e.target.id !== ""){
                            onHandleTheme(e);
                            themeDropdown = e.target.name;
                            //document.getElementById("theme_dropdown").innerHTML = themeDropdown; // setting text of above to specific dropdown item
                            //let targetValue = e.target.value;
                            setThemeDropdown( themeDropdown );
                            //console.log("selected : " + document.getElementById("dropdown1").innerHTML);
                        }
                    }}>
                        {/* <li><h6 class="dropdown-header">Dropdown explanation here</h6></li> */}
                        {(base.DEBUG_MODE) ?  
                        <li><button className="dropdown-item" id="theme1" name={themesList[0]}>{themesList[0]}</button></li>
                        : ""}
                        <li><button className="dropdown-item" id="theme2" name={themesList[1]}>{themesList[1]}</button></li>
                        <li><button className="dropdown-item" id="theme3" name={themesList[2]}>{themesList[2]}</button></li>
                    </ul>
            </div>
        </>
    )
}

export default ThemeDropdown;