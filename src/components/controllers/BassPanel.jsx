import Panel from "../ui/Panel";
import PanelButton from "../ui/PanelButton";

export default function BassPanel({ changeBass }) {
  const basses = [
    { label: "Smooth", id: 0 },
    { label: "Drive", id: 1 },
  ];

  return (
    <Panel>
      <h2 className="text-3xl font-lilita">Bass</h2>

      <div className="space-y-3">
        {basses.map((b) => (
          <PanelButton
            key={b.id}
            label={b.label}
            onClick={() => changeBass(b.id)}
          />
        ))}
      </div>
    </Panel>
  );
}
