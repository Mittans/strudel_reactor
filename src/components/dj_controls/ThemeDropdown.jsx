
function ThemeDropdown ({ themeDropdown, setThemeDropdown, onHandleTheme}) {
    // whats the option and whats the id?
    const themes = [ "Light", "Dark" ];

    return (
        <>
            <div className="btn-group input-group mb-4 flex-auto">
                    <span className="input-group-text menu_label" aria-expanded="false">Dropdown</span>
                    <button className="form-control" style={{ textAlign: "left" }} id="theme_dropdown" data-bs-toggle="dropdown">{themeDropdown}</button>
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
                        <li><button className="dropdown-item" id="theme1" name={themes[0]}>{themes[0]}</button></li>
                        <li><button className="dropdown-item" id="theme2" name={themes[1]}>{themes[1]}</button></li>
                    </ul>
            </div>
        </>
    )
}

export default ThemeDropdown;