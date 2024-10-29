// import DspLoader from '@/components/admin/common/loader'
import SessionAuthProvider from '@/context/SessionAuthProvider'
// import { Suspense } from 'react'
 import 'tailwindcss/tailwind.css'
// import InitDataDog from '@/lib/datadogConfig'

import { SessionProvider } from 'next-auth/react';

// export default function RootLayout ({ children }) {
//   return (
//     <html lang='es'>
//       <body data-theme='light' className='bg-d-white'>

//         <SessionAuthProvider>
//           <Suspense fallback={<DspLoader />}>
//             <InitDataDog />
//             {children}
//           </Suspense>
//         </SessionAuthProvider>

//       </body>
//     </html>
//   )
// }


if (process.env.NODE_ENV === 'development') {
  require('../mocks/init');
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
          <SessionAuthProvider>

        {children}
        </SessionAuthProvider>
      </body>
    </html>
  );
}
