import { useState } from "react";

import Panel from "../ui/Panel";

import { INSTRUMENT_COMBOS } from "../../config/instrumentCombos";
import RadioButton from "../ui/RadioButton";

export default function InstrumentsPanel({ onInstrumentChange }) {
  const [preset, setPreset] = useState("all");

  const handleSelect = (value) => {
    setPreset(value);
    onInstrumentChange(value);
  };

  return (
    <Panel>
      <h2 className="text-3xl font-lilita">Instrument Combinations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
        {Object.keys(INSTRUMENT_COMBOS).map((key) => (
          <RadioButton
            key={key}
            label={key}
            value={key}
            checked={preset == key}
            onChange={handleSelect}
          />
        ))}
      </div>
    </Panel>
  );
}
