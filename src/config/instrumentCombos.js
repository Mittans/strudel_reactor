export const INSTRUMENT_COMBOS = {
  all: { bassline: true, main_arp: true, drums: true, drums2: true },
  beatsOnly: {
    bassline: false,
    main_arp: false,
    drums: true,
    drums2: true,
  },
  bassDrum: { bassline: true, main_arp: false, drums: true, drums2: true },
  noDrums: { bassline: true, main_arp: true, drums: false, drums2: false },
  bassOnly: {
    bassline: true,
    main_arp: false,
    drums: false,
    drums2: false,
  },
  arpOnly: { bassline: false, main_arp: true, drums: false, drums2: false },
  drums1Only: {
    bassline: false,
    main_arp: false,
    drums: true,
    drums2: false,
  },
  drums2Only: {
    bassline: false,
    main_arp: false,
    drums: false,
    drums2: true,
  },
};

export function getComboOrDefault(key) {
  return INSTRUMENT_COMBOS[key] || INSTRUMENT_COMBOS.all;
}
