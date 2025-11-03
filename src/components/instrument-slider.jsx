function InstrumentSlider( {instrument, text} ) {
    return (
        <>
            <label for="instrumentRange" class="form-label pt-3">{instrument} {text}</label>
            <input type="range" class="form-range" min="0" max="100" step="0.5" id="instrumentRange"></input>
        </>
    )
}

export default InstrumentSlider