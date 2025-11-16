import Panel from "../ui/Panel";

export default function StatusBar({ isPlaying, bpm, volume }) {
  const statusText = isPlaying ? "Playing" : "Stopped";
  const statusColor = isPlaying ? "text-green-400" : "text-red-400";

  return (
    <Panel className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-3">
        <div className="opacity-80 text-md">BPM:</div>
        <div className="font-lilita text-3xl">{bpm}</div>
      </div>

      <div className="flex items-center gap-3">
        <div className="opacity-80 text-md">Status:</div>
        <div className={`font-lilita text-3xl ${statusColor}`}>
          {statusText}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="opacity-80 text-md">Volume:</div>
        <div className="font-lilita text-3xl">{volume}</div>
      </div>
    </Panel>
  );
}
