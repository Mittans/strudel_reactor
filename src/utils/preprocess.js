export function preprocessSong(raw, controls = {}) {
    if (!raw) return "";

    const cps = controls.cps ?? controls.tempo ?? "120/60/4";
    const room = controls.room ?? 0.2;
    const gain = controls.gain ?? 1.2;
    const muteDrums = controls.muteDrums ?? controls.drumsMuted ?? false;
    const drumsPattern = controls.drumsPattern ?? 'bd sd [~ bd] sd, hh*16';
    const p1Hushed = controls.p1Hushed ?? false;
    const synth = controls.synth ?? "gm_piano:0";

    let out = String(raw);

    // placeholders
    out = out.replaceAll("<p1_Radio>", p1Hushed ? "_" : "");
    out = out.replaceAll("<DRUMS>", muteDrums ? "~" : drumsPattern);
    out = out.replaceAll("<CPS>", String(cps));
    out = out.replaceAll("<ROOM>", String(room));
    out = out.replaceAll("<GAIN>", String(gain));
    out = out.replaceAll("<SYNTH>", String(synth));

    return out;
}
