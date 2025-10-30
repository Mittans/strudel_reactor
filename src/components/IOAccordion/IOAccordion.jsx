import AccordionItem from "./AccordionItem";

const accordionSections = [
  { id: "input", title: "Input" },
  { id: "output", title: "Editor / Output" },
];

export default function IOAccordion({ procValue, handleProcChange }) {
  return (
    <div className="my-6 space-y-4">
      {accordionSections.map((section) => (
        <AccordionItem
          section={section}
          procValue={procValue}
          handleProcChange={handleProcChange}
        />
      ))}
    </div>
  );
}
