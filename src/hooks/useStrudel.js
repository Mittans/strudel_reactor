import { useEffect, useRef, useState } from "react";
import { initializeStrudel, strudelActions } from "../strudel/strudelSetup";
import { getComboOrDefault } from "../config/instrumentCombos";

export function useStrudel(intitalTune) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [bpm, setBpm] = useState(140);
  const [volume, setVol] = useState(0.8);
  const [pattern, setPattern] = useState(0);
  const [bass, setBass] = useState(0);
  const [reverb, setReverb] = useState(0.25);

  const [isRandomHitsOn, setIsRandomHitsOn] = useState(false);
  const [isShapeValueOn, setIsShapeValueOn] = useState(false);
  const [isCrushValueOn, setIsCrushValueOn] = useState(false);

  const hasInit = useRef(false);

  const [procValue, setProcValue] = useState(intitalTune);

  // ---- Intialize Strudel ------------------------------------------------------
  useEffect(() => {
    if (!hasInit.current) {
      hasInit.current = true;
      initializeStrudel(intitalTune).then(() => {
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

  function changeVolume(newVolume) {
    setVol(newVolume);

    return applyUpdatedCode(
      /const volume = [0-9.]+/,
      `const volume = ${newVolume.toFixed(1)}`
    );
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

  function changeReverb(newReverb) {
    setReverb(newReverb);

    return applyUpdatedCode(
      /const reverb = [0-9.]+/,
      `const reverb = ${newReverb.toFixed(2)}`
    );
  }

  function changeInstrumentsCombination(preset) {
    const currentCombination = getComboOrDefault(preset);

    setProcValue((prevCode) => {
      let code = prevCode;

      for (const [name, isOn] of Object.entries(currentCombination)) {
        const noUnderscore = `${name}:`;
        const withUnderscore = `_${name}:`;

        if (isOn) {
          // remove underscore (ON)
          while (code.includes(withUnderscore)) {
            code = code.replaceAll(withUnderscore, noUnderscore);
          }
        } else {
          // Remove all the underscore from the previous setting first
          while (code.includes(withUnderscore)) {
            code = code.replaceAll(withUnderscore, noUnderscore);
          }

          // Add underscore for the new settings
          code = code.replaceAll(noUnderscore, withUnderscore);
        }
      }

      strudelActions.setCode(code);
      if (isPlaying) {
        strudelActions.evaluate();
      }

      return code;
    });
  }

  // ---- Toggle between effect ------------------------------------------------------
  function toggleEffect({ name, onValue, offValue, setEffect }) {
    const ON = `const ${name} = ${onValue}`;
    const OFF = `const ${name} = ${offValue}`;

    setProcValue((prev) => {
      // Check if effect is currently ON
      const isCurrentlyOn = prev.includes(ON);
      setEffect(!isCurrentlyOn);

      // replace the randomHits
      let newCode = isCurrentlyOn
        ? prev.replace(ON, OFF)
        : prev.replace(OFF, ON);

      // Save and run the song with new changes
      strudelActions.setCode(newCode);
      if (isPlaying) {
        strudelActions.evaluate();
      }

      return newCode;
    });
  }

  function toggleRandonHits() {
    toggleEffect({
      name: "randomHits",
      onValue: "0.25",
      offValue: "0",
      setEffect: setIsRandomHitsOn,
    });
  }

  function toggleShapeValue() {
    toggleEffect({
      name: "shapeValue",
      onValue: '"<0 0.2 0.4 0.8>*2"',
      offValue: "0",
      setEffect: setIsShapeValueOn,
    });
  }

  function toggleBitReduction() {
    toggleEffect({
      name: "crushValue",
      onValue: "4",
      offValue: "8",
      setEffect: setIsCrushValueOn,
    });
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
    procValue,
    handleProcChange,
    changeTempo,
    changeVolume,
    changeGainPattern,
    changeBass,
    changeReverb,
    reverb,
    changeInstrumentsCombination,
    toggleRandonHits,
    toggleShapeValue,
    toggleBitReduction,
    isRandomHitsOn,
    isShapeValueOn,
    isCrushValueOn,
  };
}
