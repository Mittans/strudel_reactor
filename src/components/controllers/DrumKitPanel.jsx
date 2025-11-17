import { useState } from "react";
import Panel from "../ui/Panel";
import RadioButton from "../ui/RadioButton";

export default function DrumKitPanel({
  drumKitId,
  setDrumKitId,
  changeDrumKit,
}) {
  const drumKits = [
    { label: "Classic", id: 0 },
    { label: "Acoustic", id: 1 },
    { label: "Vintage", id: 2 },
    { label: "Retro", id: 3 },
    { label: "Digital", id: 4 },
  ];

  return (
    <Panel>
      <h2 className="text-2xl font-bold mb-6 text-white">Drum Kit</h2>

      <div className="grid grid-cols-3 gap-3 mt-3">
        {drumKits.map((kit) => (
          <RadioButton
            key={kit.id}
            label={kit.label}
            value={kit.id}
            checked={drumKitId === kit.id}
            onChange={(newId) => changeDrumKit(newId)}
          />
        ))}
      </div>
    </Panel>
  );
}
