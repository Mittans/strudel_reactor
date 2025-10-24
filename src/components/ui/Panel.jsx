export default function Panel({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl p-6 bg-white/20 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] border border-white/25 mt-4 ${className}`}
    >
      {children}
    </div>
  );
}
