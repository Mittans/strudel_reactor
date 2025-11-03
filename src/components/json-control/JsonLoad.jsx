import Swal from "sweetalert2";

function JsonLoad({ setStrudelCode, setCpm, setVolume }) {

    async function loadApp() {
        // Filters to only json presets
        const keys = Object.keys(localStorage).filter(key => key.endsWith("_JSON"));

        if (keys.length === 0) {
            Swal.fire("No saved presets", "You haven't saved a preset yet!", "info");
            return;
        }

        // Prompts which preset to load
        const { value: chosenKey } = await Swal.fire({
            title: "Select a preset",
            input: "select",
            inputOptions: keys.reduce((acc, key) => {
                acc[key] = key;
                return acc;
            }, {}),
            showCancelButton: true,
            confirmButtonText: "Select",
            cancelButtonText: "Cancel"
        });

        if (!chosenKey) return;

        // Prompts to either load or delete preset
        const { isConfirmed, isDenied } = await Swal.fire({
            title: `Load or Delete "${chosenKey}"?`,
            showDenyButton: true,
            confirmButtonText: "Load",
            denyButtonText: "Delete",
            showCancelButton: true
        });

        if (isConfirmed) {
            const JSONString = localStorage.getItem(chosenKey);
            if (JSONString) {
                const data = JSON.parse(JSONString);
                setStrudelCode(data.strudelCode);
                setCpm(data.cpm);
                setVolume(data.volume);
                Swal.fire("Loaded!", `"${chosenKey}" loaded successfully`, "success");
            } else {
                Swal.fire("Error", "Could not find preset in local storage", "error");
            }
        }

        if (isDenied) {
            const confirmDelete = await Swal.fire({
                title: "Are you sure?",
                text: `Delete "${chosenKey}" permanently?`,
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes",
                confirmButtonColor: "#f70244"
            });

            if (confirmDelete.isConfirmed) {
                localStorage.removeItem(chosenKey);
                Swal.fire("Deleted!", `"${chosenKey}" has been removed.`, "success");
            }
        }
    }

    return (
        <button className="btn btn-primary" onClick={loadApp}>Load JSON</button>
    );
}

export default JsonLoad;
