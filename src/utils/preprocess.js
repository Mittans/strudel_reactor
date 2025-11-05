export function preprocessSong(text, c) {
    const tempo = c?.tempo?.trim() || "120/60/4";
    const room = Number.isFinite(c?.room) ? c.room : 0.2;
    const gain = Number.isFinite(c?.gain) ? c.gain : 1.2;
    const synth = c?.synth || "gm_piano:0";
    const drumsRadio = c?.drumsMuted ? "_" : "";

    return (text || "")
        .replaceAll("<TEMPO>", tempo)
        .replaceAll("<ROOM>", String(room))
        .replaceAll("<GAIN>", String(gain))
        .replaceAll("<SYNTH>", synth)
        .replaceAll("<DRUMS_RADIO>", drumsRadio)
        .replaceAll("<p1_Radio>", c?.p1Hushed ? "_" : ""); 
}