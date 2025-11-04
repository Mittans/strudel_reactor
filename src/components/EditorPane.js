import { useStrudel } from "../context/StrudelProvider";

export default function EditorPane() {
    const { raw, setRaw, processed } = useStrudel();

    return (
        <div className="row">
            <div className="col-md-6">
                <label className="form-label">Text to preprocess:</label>
                <textarea
                    className="form-control"
                    rows={15}
                    value={raw}
                    onChange={(e) => setRaw(e.target.value)}
                />
            </div>

            <div className="col-md-6">
                <label className="form-label">Preprocessed output:</label>
                <pre
                    className="form-control"
                    style={{ height: "100%", minHeight: "340px", overflow: "auto" }}
                >
                    {processed}
                </pre>
            </div>
        </div>
    );
}
