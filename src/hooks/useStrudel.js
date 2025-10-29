import { useEffect, useRef, useState } from "react";
import { initStrudel, playTune, stopTune } from "../strudel/strudelController";
import { strudelActions } from "../strudel/strudelSetup";

export function useStrudel(intitalTune) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [bpm, setBpm] = useState(140);
  const [volume, setVol] = useState(0.8);
  const [pattern, setPattern] = useState("0");

  const hasInit = useRef(false);

  const [procValue, setProcValue] = useState(intitalTune);

  // Intialize Strudel
  useEffect(() => {
    if (!hasInit.current) {
      hasInit.current = true;
      initStrudel(intitalTune).then(() => {
        setIsReady(true);
      });
    }
  }, [intitalTune]);

  function changeTempo(newBpm) {
    setBpm(newBpm);

    setProcValue((prevCode) => {
      // replace the current tempo with the new one
      let updatedCode = prevCode.replace(
        /setcps\([^)]*\)/g, // look for setcps\n + [^)] match everything except + "*" repeat that any number of times + \) matching the closing parentheses + /g means find all matches)
        `setcps(${newBpm}/60/4)`
      );

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

  function changeGainPattern(newGainPattern) {
    setPattern(newGainPattern);

    // Convert to integer
    const patternIndex = parseInt(newGainPattern);

    // TODO: Explain the replace method and refactor the changeTempo and changePattern
    setProcValue((prevCode) => {
      let updatedCode = prevCode.replace(
        /const\s+pattern\s*=\s*\d+/,
        `const pattern = ${patternIndex}`
      );

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
  };
}
