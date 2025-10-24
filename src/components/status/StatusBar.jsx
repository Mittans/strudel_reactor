import Panel from "../ui/Panel";
import StatusBarItem from "./StatusBarItem";

export default function StatusBar() {
  return (
    <Panel className="flex justify-between items-center gap-4">
      <StatusBarItem label={"BPM"} status={"120"} />
      <StatusBarItem label={"Status"} status={"Stopped"} />
      <StatusBarItem label={"Preset"} status={"Default"} />
    </Panel>
  );
}
