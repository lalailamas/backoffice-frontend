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
export const Toast = (message, html, timer) => {
  let timerInterval
  Swal.fire({
    title: message,
    html,
    timer,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
  })
}
