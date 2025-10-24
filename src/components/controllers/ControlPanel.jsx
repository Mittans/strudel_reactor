import { useState } from "react";

// import icons
import { FaPlay, FaStop } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";

// import functions
import { strudelActions } from "../../strudel/strudelSetup";
import { Proc } from "../../strudel/procLogic";

export default function ControlPanel() {
  const [open, setOpen] = useState(false);

  const handleProcess = () => {
    Proc();
    setOpen(false);
  };

  const handleProcessAndPlay = () => {
    Proc();
    strudelActions.evaluate();
    setOpen(false);
  };

  return (
    <div className="relative flex items-center justify-center gap-4 mt-5">
      <button
        className="p-5 rounded-full bg-red-500 hover:bg-red-400 text-white shadow-lg shadow-green-500/40 hover:shadow-green-400/60 hover:scale-105 transition"
        onClick={strudelActions.stop}
      >
        <FaStop className="text-3xl" />
      </button>
      <button
        className="p-5 rounded-full bg-green-500 hover:bg-green-400 text-white shadow-lg shadow-green-500/40 hover:shadow-green-400/60 hover:scale-105 transition"
        onClick={strudelActions.evaluate}
      >
        <FaPlay className="text-6xl" />
      </button>

      <div className="relative">
        <button
          className="p-5 rounded-full bg-yellow-500 hover:bg-yellow-400 text-white shadow-lg shadow-green-500/40 hover:shadow-green-400/60 hover:scale-105 transition"
          onClick={() => setOpen((o) => !o)}
        >
          <IoSettings className="text-3xl" />
        </button>

        {open && (
          <div className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-10 min-w-[200px] rounded-lg border border-white/25 bg-white/20 backdrop-blur-md p-2 shadow-lg">
            <button
              className="w-full text-left px-3 py-2 rounded-md text-white hover:bg-white/20 transition"
              onClick={handleProcess}
            >
              Process Text
            </button>
            <button
              className="mt-1 w-full text-left px-3 py-2 rounded-md text-white hover:bg-white/20 transition"
              onClick={handleProcessAndPlay}
            >
              Process Text & Play
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
