export const CONTROL_DEFINITIONS = {
  speed: { type: "slider", min: 0.1, max: 4, step: 0.1, default: 1 },
  gain: { type: "slider", min: 0, max: 100, step: 1, default: 50 },
  reverb: { type: "slider", min: 0, max: 1, step: 0.01, default: 0 },
  room: { type: "slider", min: 0, max: 1, step: 0.01, default: 0 },
  octave: { type: "number", min: -3, max: 10, default: 0 },
  arp_rate: { type: "slider", min: 0.1, max: 4, step: 0.1, default: 1 },
  cps: { type: "number", min: 0.1, max: 10, step: 0.1, default: 0.5 },
  lpf: { type: "slider", min: 100, max: 10000, step: 100, default: 1000 },
  hpf: { type: "slider", min: 20, max: 5000, step: 50, default: 20 },
  cutoff: { type: "slider", min: 100, max: 10000, step: 100, default: 1000 },
  attack: { type: "slider", min: 0, max: 2, step: 0.01, default: 0.1 },
  release: { type: "slider", min: 0, max: 2, step: 0.01, default: 0.1 },
  postgain: { type: "slider", min: 0, max: 10, step: 0.1, default: 1 },
};

export function extractControlsFromCode(code) {
  if (!code) return { controls: [], initialValues: {} };

  const found = new Set();
  const initialValues = {};

  for (const key of Object.keys(CONTROL_DEFINITIONS)) {
    const patterns = [
      new RegExp(`\\b${key}\\s*\\(\\s*([0-9.]+)\\s*\\)`, 'g'),
      new RegExp(`\\.${key}\\s*\\(\\s*([0-9.]+)\\s*\\)`, 'g'),
      new RegExp(`\\b${key}\\s+([0-9.]+)\\b`, 'g')
    ];

    for (const pattern of patterns) {
      const matches = [...code.matchAll(pattern)];
      if (matches.length > 0) {
        found.add(key);
        // Use the first match value as initial
        const firstValue = parseFloat(matches[0][1]);
        if (!isNaN(firstValue)) {
          initialValues[key] = firstValue;
        } else if (!(key in initialValues)) {
          initialValues[key] = CONTROL_DEFINITIONS[key].default;
        }
        break;
      }
    }
  }

  return { controls: Array.from(found), initialValues };
}

export function applyControlsToCode(baseCode, values) {
  if (!baseCode) return baseCode;
  
  let result = baseCode;

  for (const [key, val] of Object.entries(values)) {
    const funcPattern = new RegExp(`\\b${key}\\s*\\(\\s*[0-9.]+\\s*\\)`, 'g');
    result = result.replace(funcPattern, `${key}(${val})`);

    const methodPattern = new RegExp(`\\.${key}\\s*\\(\\s*[0-9.]+\\s*\\)`, 'g');
    result = result.replace(methodPattern, `.${key}(${val})`);

    const spacePattern = new RegExp(`\\b${key}\\s+[0-9.]+\\b`, 'g');
    result = result.replace(spacePattern, `${key} ${val}`);
  }

  return result;
}