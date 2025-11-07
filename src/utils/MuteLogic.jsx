export function toggleSectionPrefix(ProcText, sectionId, checked) {
    const regex = new RegExp(`^_?${sectionId}:`, "m");
    return ProcText.replace(regex, checked ? `_${sectionId}:` : `${sectionId}:`);
}