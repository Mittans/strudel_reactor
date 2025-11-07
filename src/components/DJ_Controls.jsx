import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

function DJ_Controls({ volume, onVolumeChange, onToggle }) {

    return (
        <>
            {/*cpm input*/}
            <div class="accordion" id="accordionPanelsStayOpenExample">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                            CPM Input
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
                        <div class="accordion-body">
                            <div className="input-group mb-3">
                                <span className="input-group-text" id="cpm_label">SetCPM</span>
                                <input type="text" className="form-control" id="cpm_label_text" placeholder="CPM" aria-label="CPM" aria-describedby="cpm_label" />
                            </div>
                        </div>
                    </div>
                </div>

                {/*volume slider*/}
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
                            Volume Slider
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <label htmlFor="volume_range" className="form-label">Volume</label>
                            <input type="range" className="form-range" min="0" max="2" step="0.1" onMouseUp={onVolumeChange} id="volume_range" />
                        </div>
                    </div>
                </div>

                {/* mute options */}
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="false" aria-controls="panelsStayOpen-collapseThree">
                            Mute Options
                        </button>
                    </h2>
                    <div id="panelsStayOpen-collapseThree" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="bassline" onChange={onToggle} />
                                <label className="form-check-label" htmlFor="bassline">
                                    bassline
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="main_arp" onChange={onToggle} />
                                <label className="form-check-label" htmlFor="main_arp">
                                    main arp
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="drums" onChange={onToggle} />
                                <label className="form-check-label" htmlFor="drums">
                                    drums 1
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="drums2" onChange={onToggle} />
                                <label className="form-check-label" htmlFor="drums2">
                                    drums 2
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DJ_Controls;


