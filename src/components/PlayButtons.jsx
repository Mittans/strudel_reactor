const PlayButtons = () => {
  return (
    <>
      <div className="btn-group" role="group" aria-label="Play Buttons">
        <button id="play" className="btn btn-outline-primary">
          Play
        </button>
        <button id="stop" className="btn btn-outline-primary">
          Stop
        </button>
      </div>
    </>
  );
};

export default PlayButtons;
