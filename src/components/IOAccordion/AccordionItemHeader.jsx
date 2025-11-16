// import icon
import { FaChevronDown } from "react-icons/fa";

export default function AccordionItemHeader({
  section,
  openSectionId,
  toggleSection,
}) {
  return (
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
  );
}
