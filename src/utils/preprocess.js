export function preprocessSong(text, { p1Hushed }) {
    const replaceP1 = p1Hushed ? "_" : "";
    return (text || "").replaceAll("<p1_Radio>", replaceP1);
}
