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
    const result = await Swal.fire({
      title: message,
      html,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading()
      }
    })

    // Puedes ajustar esta lógica según tus necesidades
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  } catch (error) {
    console.error('Error mostrando el Toast:', error)
  }
}
