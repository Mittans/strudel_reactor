import { useState } from "react";

// import icon
import { FaChevronDown } from "react-icons/fa";

export default function AccordionItem({
  section,
  procValue,
  handleProcChange,
}) {
  const [openSectionId, setOpenSectionId] = useState("");

  const toggleSection = (id) => {
    setOpenSectionId(openSectionId === id ? null : id);
  };

  return (
    <div
      key={section.id}
      className="border border-white/30 rounded-lg shadow-xl bg-white/20"
    >
      {/* ---------------- Header of Accordion ---------------- */}
      <button
        className="flex justify-between items-center w-full p-4 text-left font-semibold text-lg hover:bg-white/20 transition"
        onClick={() => toggleSection(section.id)}
      >
        {section.title}
        <FaChevronDown
          className={`w-6 h-6 transition-transform duration-300 ${
            openSectionId === section.id ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {/* ---------------- Content of Accordion Item ---------------- */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          openSectionId === section.id
            ? "opacity-100 max-h-[50vh]"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="pt-0">
          {/* ---------------- Input ---------------- */}
          {section.id === "input" && (
            <div className="w-full max-h-[300px] overflow-y-auto bg-white rounded-b-lg">
              <textarea
                className="w-full form-control text-gray-900 bg-white p-2 shadow-inner focus:ring-2  focus:ring-blue-400"
                rows="15"
                id="proc"
                value={procValue}
                onChange={handleProcChange}
                style={{ resize: "none" }}
              />
            </div>
          )}

          {/* ---------------- Editor / Output ---------------- */}
          {section.id === "output" && (
            <div className="w-full max-h-[800px] bg-black overflow-y-auto">
              <div id="editor" className="min-h-[100px] bg-gray-100 p-2 mb-2" />
              <div
                id="output"
                className="min-h-[100px] bg-gray-100 p-2 rounded-b-lg"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
