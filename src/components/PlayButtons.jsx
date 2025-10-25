const PlayButtons = ({ onPlay, onStop }) => {
  return (
    <>
      <div className="btn-group" role="group" aria-label="Play Buttons">
        <button id="play" className="btn btn-outline-primary" onClick={onPlay}>
          Play
        </button>
        <button id="stop" className="btn btn-outline-primary" onClick={onStop}>
          Stop
        </button>
      </div>
    </>
  );
};

export default PlayButtons;
