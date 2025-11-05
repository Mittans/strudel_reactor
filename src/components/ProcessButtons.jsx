function ProcessButtons({ handleProcess, processAndPlay }) {
  return (
      <div className="text-center">
          <button id="process" className="btn btn-outline-primary" onClick={handleProcess}>Preprocess</button>
          <button id="process_play" className="btn btn-outline-primary" onClick={processAndPlay}>Process & Play</button>
      </div>
  );
}

export default ProcessButtons;