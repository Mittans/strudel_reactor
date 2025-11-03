import Panel from "../ui/Panel";
import Slider from "../ui/Slider";

export default function MixerPanel({
  volume,
  bpm,
  reverb,
  onVolumeChange,
  onTempoChange,
  onReverbChange,
}) {
  return (
    <Panel>
      <h2 className="text-3xl font-lilita">Mixer Panel</h2>

      {/* ------------Volume------------ */}
      <Slider
        id="volume-slider"
        label={`Volume`}
        min={0}
        max={3}
        step={0.1}
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

      {/* ------------Reverb------------ */}
      <Slider
        id="tempo-slider"
        label={`Reverb`}
        min={0.01}
        max={10}
        step={0.01}
        value={reverb}
        onChange={(e) => onReverbChange(parseFloat(e.target.value))}
      />
    </Panel>
  );
}
