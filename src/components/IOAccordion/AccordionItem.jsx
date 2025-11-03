import { useState } from "react";

import AccordionItemHeader from "./AccordionItemHeader";
import AccordionItemBody from "./AccordionItemBody";

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
    <div className="border border-white/30 rounded-lg shadow-xl bg-white/20">
      {/* ---------------- Header of Accordion ---------------- */}
      <AccordionItemHeader
        section={section}
        openSectionId={openSectionId}
        toggleSection={toggleSection}
      />

      {/* ---------------- Content of Accordion Item ---------------- */}
      <AccordionItemBody
        openSectionId={openSectionId}
        section={section}
        procValue={procValue}
        handleProcChange={handleProcChange}
      />
    </div>
  );
}
