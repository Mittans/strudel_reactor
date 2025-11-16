import Panel from "../ui/Panel";
import PanelButton from "../ui/PanelButton";

export default function PatternPanel({ changeGainPattern }) {
  const patterns = [
    { label: "Steady", id: 0 },
    { label: "Up & Down", id: 1 },
    { label: "Complex", id: 2 },
  ];
  return (
    <Panel>
      <h2 className="text-3xl font-lilita">Gain Pattern</h2>

      <div className="space-y-3">
        {patterns.map((p) => (
          <PanelButton
            key={p.id}
            label={p.label}
            onClick={() => changeGainPattern(p.id)}
          />
        ))}
      </div>
    </Panel>
  );
}
