import './load_settings_buttons.css'

function load_settings_buttons() {
    return (
        <>
            {/* save settings as json */}
            <button id="save" className="btn btn-outline-primary">SAVE</button>
            {/* load settings from json */}
            <button id="load" className="btn btn-outline-primary">LOAD</button>
        </>
    )
}

export default load_settings_buttons;