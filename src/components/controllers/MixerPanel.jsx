import Panel from "../ui/Panel";
import Slider from "../ui/Slider";

export default function MixerPanel({
  volume,
  bpm,
  onVolumeChange,
  onTempoChange,
}) {
  return (
    <Panel>
      <h2 className="text-3xl font-lilita">Mixer Panel</h2>

      {/* ------------Volume------------ */}
      <Slider
        id="volume-slider"
        label={`Volume`}
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
      />

      {/* ------------Tempo------------ */}
      <Slider
        id="tempo-slider"
        label={`Tempo`}
        min={40}
        max={240}
        step={1}
        value={bpm}
        onChange={(e) => onTempoChange(parseInt(e.target.value))}
      />
    </Panel>
  );
}
