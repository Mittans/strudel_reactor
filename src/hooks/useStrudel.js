import { useEffect, useRef, useState } from "react";
import { initializeStrudel, strudelActions } from "../strudel/strudelSetup";

// Get some default settings, effect and combos from config
import { getComboOrDefault } from "../config/instrumentCombos";
import { EFFECTS } from "../config/effects";
import {
  BASS_DEFAULT,
  BPM_DEFAULT,
  PATTERN_DEFAULT,
  REVERB_DEFAULT,
  VOLUME_DEFAULT,
} from "../config/audioDefaults";

export function useStrudel(initialTune) {
  const [procValue, setProcValue] = useState(initialTune);

  const [bpm, setBpm] = useState(BPM_DEFAULT);
  const [volume, setVol] = useState(VOLUME_DEFAULT);
  const [pattern, setPattern] = useState(PATTERN_DEFAULT);
  const [bass, setBass] = useState(BASS_DEFAULT);
  const [reverb, setReverb] = useState(REVERB_DEFAULT);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [isRandomHitsOn, setIsRandomHitsOn] = useState(false);
  const [isShapeValueOn, setIsShapeValueOn] = useState(false);
  const [isCrushValueOn, setIsCrushValueOn] = useState(false);

  const hasInit = useRef(false);

  // ---- Initialize Strudel ------------------------------------------------------
  useEffect(() => {
    if (!hasInit.current) {
      hasInit.current = true;
      initializeStrudel(initialTune).then(() => {
        setIsReady(true);
      });
    }
  }, [initialTune]);

  // ---- Helper Functions ------------------------------------------------------
  function applyUpdatedCode(currentText, replacedText) {
    setProcValue((prevCode) => {
      let updatedCode = prevCode.replace(currentText, replacedText);
      setCodeAndPlay(updatedCode);
      updateUiFromCode(updatedCode);
      return updatedCode;
    });
  }

  function updateUiFromCode(code) {
    const newBpm = code.match(/setcps\((\d+)\/60\/4\)/);
    const newPattern = code.match(/const pattern = (\d+)/);
    const newBass = code.match(/const bass = (\d+)/);
    const newVolume = code.match(/const volume = ([\d.]+)/);
    const newReverb = code.match(/const reverb = ([\d.]+)/);
    const newRandomHits = code.match(/const\s+randomHits\s*=\s*([\d.]+)/);
    const newShapeValue = code.match(
      /const\s+shapeValue\s*=\s*("[^"]*"|<[^>]+>|\d+(\.\d+)?)/
    );
    const newCrushValue = code.match(/const\s+crushValue\s*=\s*([\d.]+)/);

    if (newBpm) {
      setBpm(Number(newBpm[1]));
    }

    if (newPattern) {
      setPattern(Number(newPattern[1]));
    }

    if (newBass) {
      setBass(Number(newBass[1]));
    }

    if (newVolume) {
      setVol(Number(newVolume[1]));
    }

    if (newReverb) {
      setReverb(Number(newReverb[1]));
    }

    if (newRandomHits) {
      setIsRandomHitsOn(Number(newRandomHits[1]) !== 0);
    }

    if (newShapeValue) {
      setIsShapeValueOn(Number(newShapeValue[1]) !== 0);
    }

    if (newCrushValue) {
      setIsCrushValueOn(Number(newCrushValue[1]) !== 8);
    }
  }

  function setCodeAndPlay(code) {
    setProcValue(code);
    strudelActions.setCode(code);
    if (isPlaying) {
      strudelActions.evaluate();
    }
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
      setCodeAndPlay(code);
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

      setCodeAndPlay(newCode);
      return newCode;
    });
  }

  function toggleRandomHits() {
    toggleEffect({
      name: EFFECTS.randomHits.name,
      onValue: EFFECTS.randomHits.onValue,
      offValue: EFFECTS.randomHits.offValue,
      setEffect: setIsRandomHitsOn,
    });
  }

  function toggleShapeValue() {
    toggleEffect({
      name: EFFECTS.shapeValue.name,
      onValue: EFFECTS.shapeValue.onValue,
      offValue: EFFECTS.shapeValue.offValue,
      setEffect: setIsShapeValueOn,
    });
  }

  function toggleBitReduction() {
    toggleEffect({
      name: EFFECTS.crushValue.name,
      onValue: EFFECTS.crushValue.onValue,
      offValue: EFFECTS.crushValue.offValue,
      setEffect: setIsCrushValueOn,
    });
  }

  // ---- Storage save and load ------------------------------------------------------
  const saveToLocalStorage = () => {
    localStorage.setItem("savedSong", procValue);
  };

  const loadFromLocalStorage = () => {
    const savedSong = localStorage.getItem("savedSong");

    if (!savedSong) {
      return null;
    }

    handleProcChange(savedSong);
    return savedSong;
  };

  const handleProcChange = (param) => {
    // because the param can be an e.target.value or it can be a string so check first to extract the value
    let newCode;
    if (typeof param === "string") {
      newCode = param;
    } else {
      newCode = param.target.value;
    }

    setCodeAndPlay(newCode);
    updateUiFromCode(newCode);
  };

  return {
    isReady,
    isPlaying,
    setIsPlaying,
    bpm,
    volume,
    procValue,
    setProcValue,
    handleProcChange,
    changeTempo,
    changeVolume,
    changeGainPattern,
    changeBass,
    changeReverb,
    reverb,
    changeInstrumentsCombination,
    toggleRandomHits,
    toggleShapeValue,
    toggleBitReduction,
    isRandomHitsOn,
    isShapeValueOn,
    isCrushValueOn,
    saveToLocalStorage,
    loadFromLocalStorage,
  };
}
