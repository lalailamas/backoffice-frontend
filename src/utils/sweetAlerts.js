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
export const swallInfo = (message) => {
  Swal.fire({
    icon: 'info',
    title: message,
    showConfirmButton: false,
    timer: 2000,
    iconColor: '#d5d3fb'
  })
}
export const Toast = async (message, html) => {
  try {
    await Swal.fire({
      title: message,
      html,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })
  } catch (error) {
    console.error('Error mostrando el Toast:', error)
  }
}
