export default function StatusBarItem({ label, status }) {
  return (
    <div className="flex items-center gap-3">
      <div className="opacity-80 text-md">{label}:</div>
      <div className="font-lilita text-3xl">{status}</div>
    </div>
  );
}
