function SettingsControls() {

    return (
        <>
            {/* User settings */}
            <hr className="my-3" />
            <div className="btn-toolbar mb-3" role="toolbar" aria-label="Music Style Toolbar">

                <div className="btn-group me-2" role="group" aria-label="Pop Style">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Pop
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>

                <div className="btn-group me-2" role="group" aria-label="Jazz Style">
                    <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Jazz
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>

                <div className="btn-group me-2" role="group" aria-label="Electronic Style">
                    <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Elec
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>


                <div className="btn-group me-2" role="group" aria-label="Classic Style">
                    <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Classic
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>
                <div className="btn-group me-2" role="group" aria-label="Rock Style">
                    <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Rock
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>


                <div className="btn-group me-2" role="group" aria-label="Custome Style">
                    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Custome
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button">Setting 1</button></li>
                        <li><button className="dropdown-item" type="button">Setting 2</button></li>
                        <li><button className="dropdown-item" type="button">Setting 3</button></li>
                    </ul>
                </div>


            </div>
        </>
    );
}

export default SettingsControls;
