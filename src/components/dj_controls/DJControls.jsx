import { useState } from "react";
import { setGlobalVolume } from "../StrudelSetup";
import ThemDropdown from "./ThemeDropdown";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import CodeFontSizeSlider from "./CodeFontSizeSlider";
import ResetControlsButton from "./ResetControlsButton";

// this handles controls for the editor (i.e., fontsize or whatever i do here)
export function DJControls({ codeFontSize, setCodeFontSize, themeDropdown, setThemeDropdown, onHandleGeneric, onHandleTheme, onHandleFontSize, onHandleResetControls, theme }) {
    return (
        <>
            <div className="container dj-controls bg-foreground" onChange={onHandleGeneric} data-theme={theme}>
                <br/>
                <div className="mt-4 mb-4 h6 bg-foreground">DJ Controls</div>
                

                <div className="row mb-2">
                    <div className="col bg-foreground">
                        <ThemDropdown themeDropdown={themeDropdown} setThemeDropdown={setThemeDropdown} onHandleGeneric={onHandleGeneric} onHandleTheme={onHandleTheme}/>
                    </div>
                    <div className="col bg-foreground">
                        <CodeFontSizeSlider codeFontSize={codeFontSize} setCodeFontSize={setCodeFontSize} onHandleGeneric={onHandleGeneric} onHandleFontSize={onHandleFontSize} />
                    </div>
                </div>

                <div className="row mb-2 bg-foreground">
                        {/* TODO: this does nothing! */}
                    <div className="col bg-foreground">
                        <input className="form-check-input" type="checkBox" name="aa" value="" id="checkbox_1" defaultChecked onChange={onHandleGeneric} /> {/*onChange={ProcAndPlay} */}
                        <label className="form-check-label bg-foreground" htmlFor="checkbox_1">
                            check1: a {/* p1 ON */}
                        </label>
                    </div>
                    <div className="col mb-4 bg-foreground">
                        <input className="form-check-input" type="checkBox" name="bb" value="" id="checkbox_2" onChange={onHandleGeneric} /> {/*onChange={ProcAndPlay} */}
                        <label className="form-check-label bg-foreground" htmlFor="checkbox_2">
                            check2: a {/* p1 HUSH */}
                        </label>
                    </div>
                </div>

                <br/>
                <br/>
                <br/>
                
                <div className="col mb-4 bg-foreground">
                    < ResetControlsButton onHandleResetControls={onHandleResetControls} />    
                </div>
            
            </div> {/* on update */}
            
            
        </>
    )
};

export default DJControls;