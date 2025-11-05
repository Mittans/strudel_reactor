import React from "react";

export default function StrudelHost({
    id = "strudel-editor",
    label = "Strudel Editor",
    className = "mt-3",
    style = {},
}) {
    return (
        <div className={className}>
            <label className="form-label" htmlFor={id}>{label}</label>
            <div
                id={id}
                aria-label={label}
                data-host="strudel"
                style={{
                    minHeight: 260,
                    border: "1px solid #ddd",
                    borderRadius: 6,
                    ...style,
                }}
            />
        </div>
    );
}
