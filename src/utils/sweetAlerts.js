import Swal from 'sweetalert2'

export const swallError = (message, ok) => {
  if (ok) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1200
    })
  }
  if (!ok) {
    Swal.fire({
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 2000
    })
  }
}
