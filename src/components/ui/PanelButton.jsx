export default function PanelButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-sky-400 hover:bg-sky-300 text-white py-4 px-6 rounded-xl duration-200 hover:scale-105 shadow-lg text-xl font-semibold"
    >
      {label}
    </button>
  );
}
