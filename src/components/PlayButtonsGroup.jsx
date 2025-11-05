function PlayButtonsGroup({ onPlay, onStop }) {
  return (
      <div className="text-center">
        <div className="btn-group" role="group" aria-label="Play buttons group">
              <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
              <button id="stop" className="btn btn-outline-danger" onClick={onStop}>Stop</button>
        </div>
      </div>
  );
}

export default PlayButtonsGroup;