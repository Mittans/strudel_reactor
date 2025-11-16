function SettingsControls({ effectSetters }) {
    const applyPreset = (preset) => {
        // loop to set preset 
        Object.entries(preset).forEach(([key, config]) => {
            if (!effectSetters[key]) return;

            // enable trigger
            if (typeof config.enable === "boolean") {
                effectSetters[key].setEnable(config.enable);
            }

            // amount, freq value
            if (config.amount !== undefined) {
                effectSetters[key].setAmount(config.amount);
            }
            if (config.freq !== undefined) {
                effectSetters[key].setAmount(config.freq);
            }
        });
    };


    const PRESETS = {
        pop: [
            {
                name: "Bright Studio",
                reverb: { enable: true, amount: 0.30 },
                delay: { enable: true, amount: 0.18 },
                distortion: { enable: false, amount: 0.10 },
                lowpass: { enable: true, freq: 6200 },
                highpass: { enable: true, freq: 180 },
                chorus: { enable: true, amount: 0.28 },
                wow: { enable: false, amount: 0.5 }
            },
            {
                name: "Modern Wide",
                reverb: { enable: true, amount: 0.42 },
                delay: { enable: true, amount: 0.25 },
                distortion: { enable: false, amount: 0.15 },
                lowpass: { enable: true, freq: 6800 },
                highpass: { enable: true, freq: 220 },
                chorus: { enable: true, amount: 0.35 },
                wow: { enable: true, amount: 1.2 }
            },
            {
                name: "Airy Chorus",
                reverb: { enable: true, amount: 0.50 },
                delay: { enable: true, amount: 0.28 },
                distortion: { enable: false, amount: 0.12 },
                lowpass: { enable: true, freq: 7000 },
                highpass: { enable: true, freq: 260 },
                chorus: { enable: true, amount: 0.55 },
                wow: { enable: true, amount: 2.0 }
            }
        ],
        jazz: [
            {
                name: "Small Lounge",
                reverb: { enable: true, amount: 0.38 },
                delay: { enable: false, amount: 0 },
                distortion: { enable: false, amount: 0.05 },
                lowpass: { enable: true, freq: 4600 },
                highpass: { enable: true, freq: 220 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: true, amount: 1.0 }
            },
            {
                name: "Blue Note",
                reverb: { enable: true, amount: 0.55 },
                delay: { enable: true, amount: 0.12 },
                distortion: { enable: false, amount: 0.07 },
                lowpass: { enable: true, freq: 4200 },
                highpass: { enable: true, freq: 300 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: true, amount: 1.8 }
            },
            {
                name: "Grand Hall",
                reverb: { enable: true, amount: 0.68 },
                delay: { enable: true, amount: 0.20 },
                distortion: { enable: false, amount: 0.08 },
                lowpass: { enable: true, freq: 3800 },
                highpass: { enable: true, freq: 330 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: true, amount: 2.5 }
            }
        ],
        elec: [
            {
                name: "Basic Lead",
                reverb: { enable: true, amount: 0.20 },
                delay: { enable: true, amount: 0.40 },
                distortion: { enable: true, amount: 0.35 },
                lowpass: { enable: false, freq: 8000 },
                highpass: { enable: true, freq: 450 },
                chorus: { enable: true, amount: 0.35 },
                wow: { enable: true, amount: 3 }
            },
            {
                name: "Festival Drop",
                reverb: { enable: true, amount: 0.30 },
                delay: { enable: true, amount: 0.55 },
                distortion: { enable: true, amount: 0.65 },
                lowpass: { enable: false, freq: 8000 },
                highpass: { enable: true, freq: 650 },
                chorus: { enable: true, amount: 0.45 },
                wow: { enable: true, amount: 5 }
            },
            {
                name: "Hardstyle Bass",
                reverb: { enable: true, amount: 0.25 },
                delay: { enable: true, amount: 0.60 },
                distortion: { enable: true, amount: 0.80 },
                lowpass: { enable: false, freq: 8000 },
                highpass: { enable: true, freq: 900 },
                chorus: { enable: true, amount: 0.60 },
                wow: { enable: true, amount: 7 }
            }
        ],
        classic: [
            {
                name: "Chamber",
                reverb: { enable: true, amount: 0.52 },
                delay: { enable: false, amount: 0 },
                distortion: { enable: false, amount: 0.05 },
                lowpass: { enable: true, freq: 3600 },
                highpass: { enable: false, freq: 200 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: false, amount: 0.5 }
            },
            {
                name: "Concert Hall",
                reverb: { enable: true, amount: 0.70 },
                delay: { enable: false, amount: 0 },
                distortion: { enable: false, amount: 0.05 },
                lowpass: { enable: true, freq: 3200 },
                highpass: { enable: false, freq: 200 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: true, amount: 1.0 }
            },
            {
                name: "Cathedral",
                reverb: { enable: true, amount: 0.82 },
                delay: { enable: true, amount: 0.15 },
                distortion: { enable: false, amount: 0.05 },
                lowpass: { enable: true, freq: 2500 },
                highpass: { enable: false, freq: 150 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: true, amount: 1.4 }
            }
        ],

        rock: [
            {
                name: "Stage Drive",
                reverb: { enable: true, amount: 0.30 },
                delay: { enable: false, amount: 0 },
                distortion: { enable: true, amount: 0.40 },
                lowpass: { enable: false, freq: 8000 },
                highpass: { enable: true, freq: 280 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: false, amount: 0.5 }
            },
            {
                name: " Arena",
                reverb: { enable: true, amount: 0.45 },
                delay: { enable: true, amount: 0.22 },
                distortion: { enable: true, amount: 0.55 },
                lowpass: { enable: false, freq: 8000 },
                highpass: { enable: true, freq: 380 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: true, amount: 1.0 }
            },
            {
                name: " Heavy Drive",
                reverb: { enable: true, amount: 0.38 },
                delay: { enable: true, amount: 0.20 },
                distortion: { enable: true, amount: 0.70 },
                lowpass: { enable: false, freq: 8000 },
                highpass: { enable: true, freq: 450 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: true, amount: 0.8 }
            }
        ]
    };


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
                        {PRESETS.pop.map((preset, index) => (
                            <li key={index}>
                                <button className="dropdown-item" type="button" onClick={() => applyPreset(preset)}>
                                    {preset.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="btn-group me-2" role="group" aria-label="Jazz Style">
                    <button type="button" className="btn btn-info dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Jazz
                    </button>
                    <ul className="dropdown-menu">
                        {PRESETS.jazz.map((preset, index) => (
                            <li key={index}>
                                <button className="dropdown-item" type="button" onClick={() => applyPreset(preset)}>
                                    {preset.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="btn-group me-2" role="group" aria-label="Electronic Style">
                    <button type="button" className="btn btn-success dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Elec
                    </button>
                    <ul className="dropdown-menu">
                        {PRESETS.elec.map((preset, index) => (
                            <li key={index}>
                                <button className="dropdown-item" type="button" onClick={() => applyPreset(preset)}>
                                    {preset.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>


                <div className="btn-group me-2" role="group" aria-label="Classic Style">
                    <button type="button" className="btn btn-warning dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Classic
                    </button>
                    <ul className="dropdown-menu">
                        {PRESETS.classic.map((preset, index) => (
                            <li key={index}>
                                <button className="dropdown-item" type="button" onClick={() => applyPreset(preset)}>
                                    {preset.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="btn-group me-2" role="group" aria-label="Rock Style">
                    <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        Rock
                    </button>
                    <ul className="dropdown-menu">
                        {PRESETS.rock.map((preset, index) => (
                            <li key={index}>
                                <button className="dropdown-item" type="button" onClick={() => applyPreset(preset)}>
                                    {preset.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>


                {/*<div className="btn-group me-2" role="group" aria-label="Custome Style">*/}
                {/*    <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">*/}
                {/*        Custome*/}
                {/*    </button>*/}
                {/*    <ul className="dropdown-menu">*/}
                {/*        <li><button className="dropdown-item" type="button">Setting 1</button></li>*/}
                {/*        <li><button className="dropdown-item" type="button">Setting 2</button></li>*/}
                {/*        <li><button className="dropdown-item" type="button">Setting 3</button></li>*/}
                {/*    </ul>*/}
                {/*</div>*/}


            </div>
        </>
    );
}

export default SettingsControls;
