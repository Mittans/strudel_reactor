import { useCallback, useEffect, useRef, useState } from "react";
import {
  initStrudel,
  playTune,
  setTempo,
  setVolume,
  stopTune,
} from "../strudel/strudelController";
import { strudelActions } from "../strudel/strudelSetup";

export function useStrudel(intitalTune) {
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const [bpm, setBpm] = useState(140);
  const [volume, setVol] = useState(0.8);
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

  // Only immediate changing the value of tempo when the music is playing
  useEffect(() => {
    if (!isReady || !isPlaying) {
      return;
    }

    setTempo(bpm);
  }, [bpm, isReady, isPlaying]);

  // Only immediate changing the value of volume when the music is playing
  useEffect(() => {
    if (!isReady || !isPlaying) {
      return;
    }

    setVolume(volume);
  }, [volume, isReady, isPlaying]);

  function changeTempo(newBpm) {
    setBpm(newBpm);
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
  };
}
