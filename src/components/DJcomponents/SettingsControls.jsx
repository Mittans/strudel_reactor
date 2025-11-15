function SettingsControls({ setEnableReverb, setReverbAmount,
    setEnableDelay, setDelayAmount,
    setEnableDistortion, setDistortionAmount,
    setEnableLowPass, setLowPassFreq,
    setEnableHighPass, setHighPassFreq,
    setEnableChorus, setChorusAmount,
    setEnableWow, setWowAmount }) {
    const applyPreset = (preset) => {

        // Reverb
        if (preset.reverb !== undefined) {
            setEnableReverb(preset.reverb.enable);
            setReverbAmount(preset.reverb.amount);
        }

        // Delay
        if (preset.delay !== undefined) {
            setEnableDelay(preset.delay.enable);
            setDelayAmount(preset.delay.amount);
        }

        // Distortion
        if (preset.dist !== undefined) {
            setEnableDistortion(preset.dist.enable);
            setDistortionAmount(preset.dist.amount);
        }

        // Low-pass
        if (preset.lp !== undefined) {
            setEnableLowPass(preset.lp.enable);
            setLowPassFreq(preset.lp.freq);
        }

        // High-pass
        if (preset.hp !== undefined) {
            setEnableHighPass(preset.hp.enable);
            setHighPassFreq(preset.hp.freq);
        }

        // Chorus
        if (preset.chorus !== undefined) {
            setEnableChorus(preset.chorus.enable);
            setChorusAmount(preset.chorus.amount);
        }

        // Wow
        if (preset.wow !== undefined) {
            setEnableWow(preset.wow.enable);
            setWowAmount(preset.wow.amount);
        }
    };

    // ============================
    // Preset Definitions
    // ============================

    const PRESETS = {

        pop: [
            {
                name: "Setting 1",
                reverb: { enable: true, amount: 0.25 },
                delay: { enable: false, amount: 0.0 },
                dist: { enable: false, amount: 0.0 },
                lp: { enable: true, freq: 5000 },
                hp: { enable: false, freq: 200 },
                chorus: { enable: true, amount: 0.3 },
                wow: { enable: false, amount: 0 }
            },
            {
                name: "Setting 2",
                reverb: { enable: true, amount: 0.45 },
                delay: { enable: true, amount: 0.25 },
                dist: { enable: false, amount: 0.0 },
                lp: { enable: true, freq: 4000 },
                hp: { enable: false, freq: 200 },
                chorus: { enable: true, amount: 0.5 },
                wow: { enable: false, amount: 0 }
            },
            {
                name: "Setting 3",
                reverb: { enable: true, amount: 0.6 },
                delay: { enable: true, amount: 0.3 },
                dist: { enable: false, amount: 0.0 },
                lp: { enable: true, freq: 3500 },
                hp: { enable: false, freq: 250 },
                chorus: { enable: true, amount: 0.6 },
                wow: { enable: false, amount: 0 }
            }
        ],

        jazz: [
            {
                name: "Setting 1",
                reverb: { enable: true, amount: 0.35 },
                delay: { enable: false, amount: 0.0 },
                dist: { enable: false, amount: 0.0 },
                lp: { enable: true, freq: 4500 },
                hp: { enable: true, freq: 250 },
                chorus: { enable: false, amount: 0.0 },
                wow: { enable: true, amount: 1 }
            },
            {
                name: "Setting 2",
                reverb: { enable: true, amount: 0.5 },
                delay: { enable: true, amount: 0.15 },
                dist: { enable: false, amount: 0.0 },
                lp: { enable: true, freq: 4200 },
                hp: { enable: true, freq: 300 },
                chorus: { enable: false, amount: 0.0 },
                wow: { enable: true, amount: 2 }
            },
            {
                name: "Setting 3",
                reverb: { enable: true, amount: 0.65 },
                delay: { enable: true, amount: 0.25 },
                dist: { enable: false, amount: 0.0 },
                lp: { enable: true, freq: 4000 },
                hp: { enable: true, freq: 350 },
                chorus: { enable: false, amount: 0.0 },
                wow: { enable: true, amount: 3 }
            }
        ],

        elec: [
            {
                name: "Setting 1",
                reverb: { enable: false, amount: 0.0 },
                delay: { enable: true, amount: 0.4 },
                dist: { enable: true, amount: 0.4 },
                lp: { enable: false, freq: 8000 },
                hp: { enable: true, freq: 500 },
                chorus: { enable: true, amount: 0.5 },
                wow: { enable: true, amount: 4 }
            },
            {
                name: "Setting 2",
                reverb: { enable: false, amount: 0.0 },
                delay: { enable: true, amount: 0.5 },
                dist: { enable: true, amount: 0.6 },
                lp: { enable: false, freq: 8000 },
                hp: { enable: true, freq: 700 },
                chorus: { enable: true, amount: 0.6 },
                wow: { enable: true, amount: 6 }
            },
            {
                name: "Setting 3",
                reverb: { enable: true, amount: 0.3 },
                delay: { enable: true, amount: 0.6 },
                dist: { enable: true, amount: 0.7 },
                lp: { enable: false, freq: 8000 },
                hp: { enable: true, freq: 900 },
                chorus: { enable: true, amount: 0.7 },
                wow: { enable: true, amount: 8 }
            }
        ],

        classic: [
            {
                name: "Setting 1",
                reverb: { enable: true, amount: 0.5 },
                delay: { enable: false, amount: 0 },
                dist: { enable: false, amount: 0 },
                lp: { enable: true, freq: 3500 },
                hp: { enable: false, freq: 200 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: false, amount: 0 }
            },
            {
                name: "Setting 2",
                reverb: { enable: true, amount: 0.65 },
                delay: { enable: false, amount: 0 },
                dist: { enable: false, amount: 0 },
                lp: { enable: true, freq: 3000 },
                hp: { enable: false, freq: 200 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: false, amount: 0 }
            },
            {
                name: "Setting 3",
                reverb: { enable: true, amount: 0.75 },
                delay: { enable: false, amount: 0 },
                dist: { enable: false, amount: 0 },
                lp: { enable: true, freq: 2500 },
                hp: { enable: false, freq: 200 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: false, amount: 0 }
            }
        ],

        rock: [
            {
                name: "Setting 1",
                reverb: { enable: true, amount: 0.3 },
                delay: { enable: false, amount: 0 },
                dist: { enable: true, amount: 0.4 },
                lp: { enable: false, freq: 8000 },
                hp: { enable: true, freq: 300 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: false, amount: 0 }
            },
            {
                name: "Setting 2",
                reverb: { enable: true, amount: 0.4 },
                delay: { enable: false, amount: 0 },
                dist: { enable: true, amount: 0.5 },
                lp: { enable: false, freq: 8000 },
                hp: { enable: true, freq: 350 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: false, amount: 0 }
            },
            {
                name: "Setting 3",
                reverb: { enable: true, amount: 0.5 },
                delay: { enable: true, amount: 0.2 },
                dist: { enable: true, amount: 0.7 },
                lp: { enable: false, freq: 8000 },
                hp: { enable: true, freq: 400 },
                chorus: { enable: false, amount: 0 },
                wow: { enable: false, amount: 0 }
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
