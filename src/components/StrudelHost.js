export default function StrudelHost({
    id = "strudel-editor",
    label = "",
    className = "",
    style,
}) {
    return (
        <div className={className}>
            {label ? <label className="form-label" htmlFor={id}>{label}</label> : null}
            <div
                id={id}
                style={{
                    minHeight: 220,          
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    ...style,
                }}
            />
        </div>
    );
}
