import { useStrudel } from "../context/StrudelProvider";

export default function EditorPane() {
    const { raw, setRaw } = useStrudel();

    return (
        <div>
            <textarea
                className="form-control"
                rows={16}
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
            />
        </div>
    );
}
