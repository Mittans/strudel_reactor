import { control } from "@strudel/core";
import Swal from "sweetalert2";

function JsonSave({strudelCode, cpm, volume}) {

    async function saveApp() {

        const controlValues = {
            strudelCode: strudelCode,
            cpm: cpm,
            volume: volume
        }

        const dataString = JSON.stringify(controlValues);

        const { value: name} = await Swal.fire({
            title: "Save Application Preset",
            input: "text",
            inputLabel: "Enter a name for your preset",
            inputPlaceholder: "e.g. My Cool Song!",
            confirmButtonText: 'Save',
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                    return 'Please enter a preset name!';
                }
            },
            confirmButtonColor: '#02f75c',
            cancelButtonColor: '#f70244'
        })

        if (name) {
            localStorage.setItem(`${name}_JSON`, dataString)

            Swal.fire({
                title: 'Saved!',
                text: `Your preset ${name} has been saved!`,
                icon: 'success',
            })
        }
    }

    return (
        <button class="btn btn-primary me-2" onClick={saveApp}>Save JSON</button>
    )

}

export default JsonSave;