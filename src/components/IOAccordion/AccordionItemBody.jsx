export default function AccordionItemBody({
  openSectionId,
  section,
  procValue,
  handleProcChange,
}) {
  return (
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
              id="proc"
              className="w-full form-control text-gray-900 bg-white p-2 shadow-inner focus:ring-2  focus:ring-blue-400"
              rows="15"
              value={procValue}
              onChange={handleProcChange}
              style={{ resize: "none" }}
            />
          </div>
        )}

        {/* ---------------- Editor / Output ---------------- */}
        {section.id === "output" && (
          <div className="w-full max-h-[800px] bg-black overflow-y-auto">
            <div id="editor"></div>
          </div>
        )}

        {/* ---------------- Canvas Display ---------------- */}
        {section.id === "canvas" && (
          <div className="w-full flex justify-center">
            <canvas id="roll" className="block" width={900} height={240} />
          </div>
        )}
      </div>
    </div>
  );
}
