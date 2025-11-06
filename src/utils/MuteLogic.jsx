export function toggleSectionPrefix(codeText, sectionId, checked) {
    const regex = new RegExp(`^_?${sectionId}:`, "m");
    return codeText.replace(regex, checked ? `_${sectionId}:` : `${sectionId}:`);
}