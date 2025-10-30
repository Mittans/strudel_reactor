export default function Slider({ id, label, min, max, step, value, onChange }) {
  return (
    <div className="w-full mt-3">
      <div className="flex justify-between items-center mb-1">
        <label className="text-white text-lg font-medium">{label}</label>
        <span className="bg-gray-700/50 text-white px-2 py-1 rounded-lg font-semibold min-w-[70px] text-center">
          {value}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, 
          #41d9ffff ${((value - min) / (max - min)) * 100}%, 
          #ffffff ${((value - min) / (max - min)) * 100}%)`,
        }}
      />
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
