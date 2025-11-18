
function HushControls({ code, hushMap, onHushChange }) {
    // Detect all <pN> tags in the code
    const tags = Array.from(new Set(Array.from(code.matchAll(/<p\d+>/g), m => m[0])));

    // If no tags found, don't render anything
    if (tags.length === 0) return null; // No tags to hush

    return (
        <div className="mb-4">
            <label className="form-label fw-bold">Mute (Hush) Controls:</label>

            {tags.map(tag => (
                <div className="form-check form-switch" key={tag}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`mute-${tag}`}
                        checked={hushMap[tag] || false}
                        onChange={e => onHushChange(tag, e.target.checked)}
                    />
                    <label className="form-check-label" htmlFor={`mute-${tag}`}>
                        {tag}
                    </label>
                </div>
            ))}
        </div>
    );
}

export default HushControls;
