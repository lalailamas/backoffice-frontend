import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

/**
 * Links component that displays a list of useful links for Despnsa Hernán Cortés.
 * It also includes Google Tag Manager and Google Analytics for tracking.
 *
 * @returns {JSX.Element} The rendered Links component.
 */
function Links () {
  return (

    <div className="flex flex-col justify-center p-10  bg-[url('/img/bg-new.svg')] bg-cover bg-center bg-no-repeat h-screen text-white">
      <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />

      <div className='flex flex-col bg-d-soft-white rounded-3xl gap-4 p-4  mx-auto'>
        <div className='flex justify-center'>
          <img src='/img/logo.svg' className='mb-6 w-full p-2' />
        </div>

        <a
          href='https://app.despnsa247.com/catalog/CNV_008'
          id='catalogo-hernan-cortes'
          className='btn text-xs rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
        >Catálogo Hernán Cortés
        </a>
        <a
          href='https://www.youtube.com/watch?v=LEsZLd1iKTY'
          className='btn text-xs rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
        >Cómo funciona Despnsa
        </a>

        <a
          href='https://despnsa247.com/preguntas-frecuentes'
          id='faq-hernan-cortes'
          className='btn text-xs rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
        >FAQ
        </a>
        <a
          id='sugerir-producto-hernan-cortes'
          href='https://forms.office.com/pages/responsepage.aspx?id=xGIHpa3FOkGgXp_-FXUognIJVBkk_DJOm3bBkqA7WBdUM0xIWldMV1QzNzlONDFKTlJYNlJGOTRMVCQlQCN0PWcu'
          className='btn text-xs rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
        >
          Quiero sugerir un producto
        </a>
        <div className='flex flex-col'>
          <a
            href='https://api.whatsapp.com/send?phone=56931760725'
            className='btn text-xs rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
          >Ayuda
            <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' viewBox='0 0 50 50' fill='white'>
              <path d='M25 2C12.309534 2 2 12.309534 2 25C2 29.079097 3.1186875 32.88588 4.984375 36.208984L2.0371094 46.730469A1.0001 1.0001 0 0 0 3.2402344 47.970703L14.210938 45.251953C17.434629 46.972929 21.092591 48 25 48C37.690466 48 48 37.690466 48 25C48 12.309534 37.690466 2 25 2zM25 4C36.609534 4 46 13.390466 46 25C46 36.609534 36.609534 46 25 46C21.278025 46 17.792121 45.029635 14.761719 43.333984A1.0001 1.0001 0 0 0 14.033203 43.236328L4.4257812 45.617188L7.0019531 36.425781A1.0001 1.0001 0 0 0 6.9023438 35.646484C5.0606869 32.523592 4 28.890107 4 25C4 13.390466 13.390466 4 25 4zM16.642578 13C16.001539 13 15.086045 13.23849 14.333984 14.048828C13.882268 14.535548 12 16.369511 12 19.59375C12 22.955271 14.331391 25.855848 14.613281 26.228516L14.615234 26.228516C14.588494 26.195329 14.973031 26.752191 15.486328 27.419922C15.999626 28.087653 16.717405 28.96464 17.619141 29.914062C19.422612 31.812909 21.958282 34.007419 25.105469 35.349609C26.554789 35.966779 27.698179 36.339417 28.564453 36.611328C30.169845 37.115426 31.632073 37.038799 32.730469 36.876953C33.55263 36.755876 34.456878 36.361114 35.351562 35.794922C36.246248 35.22873 37.12309 34.524722 37.509766 33.455078C37.786772 32.688244 37.927591 31.979598 37.978516 31.396484C38.003976 31.104927 38.007211 30.847602 37.988281 30.609375C37.969311 30.371148 37.989581 30.188664 37.767578 29.824219C37.302009 29.059804 36.774753 29.039853 36.224609 28.767578C35.918939 28.616297 35.048661 28.191329 34.175781 27.775391C33.303883 27.35992 32.54892 26.991953 32.083984 26.826172C31.790239 26.720488 31.431556 26.568352 30.914062 26.626953C30.396569 26.685553 29.88546 27.058933 29.587891 27.5C29.305837 27.918069 28.170387 29.258349 27.824219 29.652344C27.819619 29.649544 27.849659 29.663383 27.712891 29.595703C27.284761 29.383815 26.761157 29.203652 25.986328 28.794922C25.2115 28.386192 24.242255 27.782635 23.181641 26.847656L23.181641 26.845703C21.603029 25.455949 20.497272 23.711106 20.148438 23.125C20.171937 23.09704 20.145643 23.130901 20.195312 23.082031L20.197266 23.080078C20.553781 22.728924 20.869739 22.309521 21.136719 22.001953C21.515257 21.565866 21.68231 21.181437 21.863281 20.822266C22.223954 20.10644 22.02313 19.318742 21.814453 18.904297L21.814453 18.902344C21.828863 18.931014 21.701572 18.650157 21.564453 18.326172C21.426943 18.001263 21.251663 17.580039 21.064453 17.130859C20.690033 16.232501 20.272027 15.224912 20.023438 14.634766L20.023438 14.632812C19.730591 13.937684 19.334395 13.436908 18.816406 13.195312C18.298417 12.953717 17.840778 13.022402 17.822266 13.021484L17.820312 13.021484C17.450668 13.004432 17.045038 13 16.642578 13z' />
            </svg>
          </a>
        </div>
        <a
          id='proponer-lugar-despnsa'
          href='https://forms.office.com/pages/responsepage.aspx?id=xGIHpa3FOkGgXp_-FXUognIJVBkk_DJOm3bBkqA7WBdURDFQOE9BNkZTSjVWMjFPRFk4MEw1TjQxSCQlQCN0PWcu'
          className='btn text-xs rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
        >¿Puedo proponer un lugar para una Despnsa?
        </a>

        <div className='flex justify-center mt-8'>
          <ul className='flex gap-4'>
            <li>
              <a href='https://www.facebook.com/Despnsa247' className='text-white'>
                <svg className='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                  <path fillRule='evenodd' d='M13.1 6H15V3h-1.9A4.1 4.1 0 0 0 9 7.1V9H7v3h2v10h3V12h2l.6-3H12V6.6a.6.6 0 0 1 .6-.6h.5Z' clipRule='evenodd' />
                </svg>

              </a>
            </li>
            <li>
              <a href='https://www.linkedin.com/company/despnsa247' className='text-white'>
                <svg xmlns='http://www.w3.org/2000/svg' className='w-6 h-6' viewBox='0 0 30 30'>
                  <path d='M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z' />
                </svg>

              </a>
            </li>
            <li>
              <a href='https://www.instagram.com/despnsa247' className='text-white'>
                <svg className='w-6 h-6 text-gray-800 dark:text-white' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path fillRule='evenodd' clipRule='evenodd' d='M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z' fill='#000000' />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Links
