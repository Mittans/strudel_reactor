import { useEffect, useRef, useState } from "react";
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

  const changeTempo = (newBpm) => {
    setBpm(newBpm);
    setTempo(newBpm);
  };

  const changeVolume = (v) => {
    setVol(v);
    setVolume(v);
  };

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
