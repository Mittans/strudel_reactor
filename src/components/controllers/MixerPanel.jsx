import Panel from "../ui/Panel";
import Slider from "../ui/Slider";

// TODO: Create a slider component with good design the the volume ad tempo

export default function MixerPanel({
  volume,
  bpm,
  onVolumeChange,
  onTempoChange,
}) {
  return (
    <Panel>
      <h2 className="text-lg">Mixer Panel</h2>

      {/* ------------Volume------------ */}
      <Slider
        label={`Volume: ${Math.round(volume * 100)}%`}
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
      />

      {/* ------------Tempo------------ */}
      <Slider
        label={`Tempo: ${bpm} BPM`}
        min={40}
        max={240}
        step={1}
        value={bpm}
        onChange={(e) => onTempoChange(parseInt(e.target.value))}
      />
    </Panel>
  );
}
