export default function Button({ label, onClick, type }) {
  const types = {
    load: "bg-cyan-400 hover:bg-cyan-500 text-blue-900",
    save: "bg-emerald-400 hover:bg-emerald-500 text-blue-900",
  };

  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 ${types[type]} transition-all font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 text-lg`}
    >
      {label}
    </button>
  );
}
