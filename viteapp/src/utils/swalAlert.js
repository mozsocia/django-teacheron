import Swal from 'sweetalert2'

const swalConfig = {
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ok',
    // Add other common options here
    width: '400px', // Set the width of the popup window
    padding: '1rem',
}

const SwalAlert = (title, text, icon) => {
    return Swal.fire({
        title,
        text,
        icon,
        ...swalConfig
    })
}

export default SwalAlert