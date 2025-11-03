import Button from "./ui/Button";

export default function Header({ loadFromLocalStorage, saveToLocalStorage }) {
  const handleSave = () => {
    saveToLocalStorage();
    alert("Song is saved");
  };

  const handleLoad = () => {
    loadFromLocalStorage();
    alert("Song is loaded");
  };

  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-4 mt-3">
        <Button label="Load" onClick={handleLoad} type="load" />

        <h1 className="text-center font-lilita text-5xl">
          Stefan Control Studio
        </h1>

        <Button label="Save" onClick={handleSave} type="save" />
      </div>
    </div>
  );
}
