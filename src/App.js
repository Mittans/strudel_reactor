import "./App.css";
import { useState, useEffect, useRef } from "react";
import { StrudelMirror } from "@strudel/codemirror";
import { evalScope } from "@strudel/core";
import { drawPianoroll } from "@strudel/draw";
import { initAudioOnFirstClick } from "@strudel/webaudio";
import { transpiler } from "@strudel/transpiler";
import {
  getAudioContext,
  webaudioOutput,
  registerSynthSounds,
} from "@strudel/webaudio";
import { registerSoundfonts } from "@strudel/soundfonts";
import { stranger_tune } from "./tunes";
import console_monkey_patch, { getD3Data } from "./console-monkey-patch";
import DJControls from "./components/DJControls";
import PlayButtons from "./components/PlayButtons";
import ProcButtons from "./components/ProcButtons";
import PreprocessArea from "./components/PreprocessArea";

let globalEditor = null;

const handleD3Data = (event) => {
  console.log(event.detail);
};

// Mute selected track
function muteTrack(text, trackName) {
  const lines = text.split("\n");

  // update target track status
  const updatedLines = lines.map((line) => {
    if (line.trim().startsWith(`${trackName}:`)) {
      return line.replace(`${trackName}:`, `_${trackName}:`);
    }
    return line;
  });

  return updatedLines.join("\n");
}

// Preprocesses the source code by muting specific tracks
function processText(source, tracks) {
  let text = source;

  for (let trackName in tracks) {
    if (tracks[trackName] === "HUSH") {
      text = muteTrack(text, trackName);
    }
  }

  return text;
}

export default function StrudelDemo() {
  const hasRun = useRef(false);

  // Add tracks status
  const [tracks, setTracks] = useState({
    bassline: "ON",
    main_arp: "ON",
    drums: "ON",
    drums2: "ON",
  });

  //Preprocess controls
  const handlePreprocess = () => {
    let proc_text = document.getElementById("proc").value;
    let proc_text_replaced = processText(proc_text, tracks);
    globalEditor.setCode(proc_text_replaced);
  };

  const handleProcAndPlay = () => {
    if (globalEditor != null) {
      handlePreprocess();
      globalEditor.evaluate();
    }
  };

  // Playback controls
  const handlePlay = () => {
    globalEditor.evaluate();
  };

  const handleStop = () => {
    globalEditor.stop();
  };

  const handleTrackChange = (track, value) => {
    setTracks({ ...tracks, [track]: value });
  };

  // Save to localStorage json
  const handleSave = () => {
    try {
      localStorage.setItem("strudel-settings", JSON.stringify({tracks}));
      alert("Settings saved!");
    } catch (error) {
      alert("Error saving settings");
    }

  };

  // Load from localStorage json
  const handleLoad = () => {
    try {
      const saved = localStorage.getItem("strudel-settings");
    if (saved) {
      const settings = JSON.parse(saved);
      setTracks(settings.tracks);
      alert("Settings loaded");
    } else {
      alert("No saved settings found!");
    }
    } catch (error) {
      alert("Error loading settings");
    }

  };

  useEffect(() => {
    if (!hasRun.current) {
      document.addEventListener("d3Data", handleD3Data);
      console_monkey_patch();
      hasRun.current = true;
      //Code copied from example: https://codeberg.org/uzu/strudel/src/branch/main/examples/codemirror-repl
      //init canvas
      const canvas = document.getElementById("roll");
      canvas.width = canvas.width * 2;
      canvas.height = canvas.height * 2;
      const drawContext = canvas.getContext("2d");
      const drawTime = [-2, 2]; // time window of drawn haps
      globalEditor = new StrudelMirror({
        defaultOutput: webaudioOutput,
        getTime: () => getAudioContext().currentTime,
        transpiler,
        root: document.getElementById("editor"),
        drawTime,
        onDraw: (haps, time) =>
          drawPianoroll({ haps, time, ctx: drawContext, drawTime, fold: 0 }),
        prebake: async () => {
          initAudioOnFirstClick(); // needed to make the browser happy (don't await this here..)
          const loadModules = evalScope(
            import("@strudel/core"),
            import("@strudel/draw"),
            import("@strudel/mini"),
            import("@strudel/tonal"),
            import("@strudel/webaudio")
          );
          await Promise.all([
            loadModules,
            registerSynthSounds(),
            registerSoundfonts(),
          ]);
        },
      });

      document.getElementById("proc").value = stranger_tune;
    }
  }, []);

  return (
    <div>
      <h2>Strudel Demo</h2>
      <main>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
              {/* Preprocess text area */}
              <div
                style={{ maxHeight: "50vh", overflowY: "auto" }}
                className="mb-3"
              >
                <PreprocessArea />
              </div>

              {/* output */}
              <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
                <div id="editor" />
                <div id="output" />
              </div>
            </div>

            <div className="col-md-4">
              {/* Buttons */}
              <ProcButtons
                onPreprocess={handlePreprocess}
                onProcAndPlay={handleProcAndPlay}
              />
              <PlayButtons
                onPlay={handlePlay}
                onStop={handleStop} />

              {/* DJ controls */}
              <DJControls tracks={tracks}
                onTrackChange={handleTrackChange}
                onSave={handleSave}
                onLoad={handleLoad}/>
            </div>
          </div>
        </div>
        <canvas id="roll"></canvas>
      </main>
    </div>
  );
}
