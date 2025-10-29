import { useEffect, useRef, useState } from "react";
import { initStrudel, playTune, stopTune } from "../strudel/strudelController";
import { strudelActions } from "../strudel/strudelSetup";

export function useStrudel(intitalTune) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [bpm, setBpm] = useState(140);
  const [volume, setVol] = useState(0.8);
  const [pattern, setPattern] = useState(0);
  const [bass, setBass] = useState(0);

  const hasInit = useRef(false);

  const [procValue, setProcValue] = useState(intitalTune);

  // ---- Intialize Strudel ------------------------------------------------------
  useEffect(() => {
    if (!hasInit.current) {
      hasInit.current = true;
      initStrudel(intitalTune).then(() => {
        setIsReady(true);
      });
    }
  }, [intitalTune]);

  // ---- Helper Functions ------------------------------------------------------
  function applyUpdatedCode(currentText, replacedText) {
    setProcValue((prevCode) => {
      let updatedCode = prevCode.replace(currentText, replacedText);

      // update the code
      strudelActions.setCode(updatedCode);

      // re-play the song if the song is currently playing
      if (isPlaying) {
        strudelActions.evaluate();
      }

      // update the textarea
      return updatedCode;
    });
  }

  // ---- Updaters: allow user to update different setting to the song ------------------------------------------------------
  function changeTempo(newBpm) {
    setBpm(newBpm);

    return applyUpdatedCode(/setcps\([^)]*\)/g, `setcps(${newBpm}/60/4)`);
  }

  function changeGainPattern(newGainPattern) {
    setPattern(newGainPattern);

    // Convert to integer
    const patternIndex = parseInt(newGainPattern);

    return applyUpdatedCode(
      /const\s+pattern\s*=\s*\d+/,
      `const pattern = ${patternIndex}`
    );
  }

  function changeBass(newBass) {
    setBass(newBass);

    // Convert to integer
    const bassIndex = parseInt(newBass);
    return applyUpdatedCode(
      /const\s+bass\s*=\s*\d+/,
      `const bass = ${bassIndex}`
    );
  }

  function changeVolume(v) {
    setVol(v);
  }

  const handleProcChange = (e) => {
    const newCode = e.target.value;
    setProcValue(newCode);
    strudelActions.setCode(newCode);
  };

  return {
    isReady,
    isPlaying,
    setIsPlaying,
    bpm,
    volume,
    changeTempo,
    changeVolume,
    procValue,
    handleProcChange,
    changeGainPattern,
    changeBass,
  };
}
