export default function PanelToggle({ id, onClick, label, isActive }) {
  return (
    <div className="flex items-center justify-between p-3 bg-white/20 font-bold rounded-lg border border-gray-700">
      {/* Label for the toggle section */}
      <span className="text-gray-200 font-medium">{label}</span>

      <button
        onClick={onClick}
        className={`
          relative w-12 h-6 rounded-full
          ${isActive ? "bg-sky-500" : "bg-gray-600"}
        `}
      >
        <div
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
            transition-transform duration-300 ease-in-out
            ${isActive ? "translate-x-6" : "translate-x-0"}
          `}
        />
      </button>
    </div>
  );
}
