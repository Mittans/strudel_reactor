import Panel from "../ui/Panel";
import PanelButton from "../ui/PanelButton";
import PanelToggle from "../ui/PanelToggle";

export default function EffectPanel({
  toggleRandonHits,
  toggleShapeValue,
  toggleBitReduction,
  isRandomHitsOn,
  isShapeValueOn,
  isCrushValueOn,
}) {
  const effects = [
    {
      label: "Add distortion",
      id: 0,
      onClick: toggleShapeValue,
      isActive: isShapeValueOn,
    },
    {
      label: "Skip Notes",
      id: 1,
      onClick: toggleRandonHits,
      isActive: isRandomHitsOn,
    },
    {
      label: "Reduct Bit",
      id: 2,
      onClick: toggleBitReduction,
      isActive: isCrushValueOn,
    },
  ];

  return (
    <Panel>
      <h2 className="text-3xl font-lilita">Special Efects</h2>

      <div className="grid grid-cols-2 gap-3 mt-3">
        {effects.map(({ id, label, onClick, isActive }) => (
          <PanelToggle
            id={id}
            label={label}
            onClick={onClick}
            isActive={isActive}
          />
        ))}
      </div>
    </Panel>
  );
}
