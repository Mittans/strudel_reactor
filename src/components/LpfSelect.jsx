// components/LpfSelect.jsx
export default function LpfSelect({ value, onChange }) {
  const handleChange = (e) => {
    const v = e.target.value;
    if (typeof onChange === "function") {
      onChange(v === "" ? null : Number(v));
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor="lpf_select" className="form-label">LPF Cutoff</label>
      <select id="lpf_select"className="form-select"value={String(value ?? "")}onChange={handleChange}>
        <option value="">Off (no global LPF)</option>
        <option value="200">200 (LOW)</option>
        <option value="400">400</option>
        <option value="800">800</option>
        <option value="1200">1200</option>
        <option value="2000">2000</option>
        <option value="3000">3000</option>
        <option value="5000">5000 (HIGH)</option>
      </select>
    </div>
  );
}
