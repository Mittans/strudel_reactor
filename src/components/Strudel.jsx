function Strudel() {
    // Creates the strudel editor
    return (
        <div
            className="mt-3"
            style={{
                maxHeight: "50vh",
                overflowY: "auto",
                border: "2px solid yellow",
                width: "98.55%",
                padding: "0",
            }}
        >
            <div id="editor" />
            <div id="output" />
        </div>
    );
}

export default Strudel;
