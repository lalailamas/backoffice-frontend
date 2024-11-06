// import DspLoader from '../../common/loader'
import React from 'react'

export default function StockRequestTable (data) {
  const maxLocationLength = Math.max(...data.data.map(item => item.location.length))
  return (
    <>
      <div className='p-2'>
        <table className='table text-d-dark-dark-purple table-zebra mt-8 p-8'>
          <thead>
            <tr className='bg-d-dark-dark-purple text-d-white'>
              <th />
              <th>Producto</th>
              <th>Solicitado</th>
              {Array.from({ length: maxLocationLength }).map((_, index) => (
                <React.Fragment key={index}>
                  <th>Bandeja </th>
                  <th>Espacio </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.data.map((item) => {
              return (
                <tr key={item.productName}>
                  <td />
                  <td>{item.productName}</td>
                  <td>{item.requested}</td>
                  {item.location.map((location, index) => (
                    <React.Fragment key={index}>
                      <td>{location.tray}</td>
                      <td>{location.column}</td>
                    </React.Fragment>
                  ))}
                  {/* Fill in with empty cells if necessary */}
                  {Array.from({ length: maxLocationLength - item.location.length }).map((_, index) => (
                    <React.Fragment key={index}>
                      <td />
                      <td />
                    </React.Fragment>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}
// [
//   {
//     productName: 'Agua con Gas 600ml',
//     requested: 4,
//     location: [
//       {
//         tray: 1,
//         column: 6
//       }
//     ]
//   },
//   {
//     productName: 'Agua sin Gas 600ml',
//     requested: -1,
//     location: [
//       {
//         tray: 1,
//         column: 7
//       },
//       {
//         tray: 1,
//         column: 8
//       }
//     ]
//   }
// ]
