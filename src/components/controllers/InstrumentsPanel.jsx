import { useState } from "react";

import Panel from "../ui/Panel";

import { INSTRUMENT_COMBOS } from "../../config/instrumentCombos";

export default function InstrumentsPanel({ onInstrumentChange }) {
  const [preset, setPreset] = useState("all");

  return (
    <Panel>
      <h2 className="text-3xl font-lilita">Instrument Combinations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3">
        {Object.keys(INSTRUMENT_COMBOS).map((key) => (
          <label
            key={key}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition
        ${
          preset === key
            ? "bg-sky-400 hover:bg-sky-300 text-white shadow-md"
            : "bg-white/10 text-white/80 border-white/20 hover:bg-white/20"
        }`}
          >
            <input
              type="radio"
              value={key}
              checked={preset === key}
              onChange={(e) => {
                const value = e.target.value;
                setPreset(value);
                onInstrumentChange(value);
              }}
              className="hidden" // hide the radio button
            />
            <span className="capitalize font-medium">{key}</span>
          </label>
        ))}
      </div>
    </Panel>
  );
}
