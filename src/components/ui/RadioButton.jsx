export default function RadioButton({
  label,
  value,
  checked,
  onChange,
  className = "",
}) {
  const active = "bg-sky-400 text-white shadow-md border-transparent";
  const inactive =
    "bg-white/10 text-white/80 border-white/20 hover:bg-white/20";

  return (
    <label
      className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl border cursor-pointer transition ${
        checked ? active : inactive
      } ${className}`}
    >
      <input
        type="radio"
        className="hidden"
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        aria-checked={checked}
      />
      <span className="capitalize font-medium">{label}</span>
    </label>
  );
}
