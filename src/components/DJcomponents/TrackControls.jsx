function TrackControls({ muteBass, muteArp, muteDrums, muteDrums2, handleToggle }) {

    return (
        <>
            {/* CheckBox for select instruments */}
            <hr className="my-3" />
            <h6>Instrument Tracks</h6>
            <div className="mb-3">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="s1" checked={!muteBass}
                        onChange={(e) => handleToggle("bass", e.target.checked)} />
                    <label className="form-check-label" htmlFor="s1">
                        Bassline
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="a1" checked={!muteArp}
                        onChange={(e) => handleToggle("arp", e.target.checked)} />
                    <label className="form-check-label" htmlFor="a1">
                        Main Arp
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="d1" checked={!muteDrums}
                        onChange={(e) => handleToggle("drums", e.target.checked)} />
                    <label className="form-check-label" htmlFor="d1">
                        Drums
                    </label>
                </div>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="d1" checked={!muteDrums2}
                        onChange={(e) => handleToggle("drums2", e.target.checked)} />
                    <label className="form-check-label" htmlFor="d2">
                        Drums 2
                    </label>
                </div>
            </div>
        </>
    );
}

export default TrackControls;
