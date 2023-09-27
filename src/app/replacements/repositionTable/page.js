/* eslint-disable multiline-ternary */
'use client'
export default function RepositionTable ({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className='h-screen'>
        <p className='text-center'>No hay datos disponibles</p>
      </div>
    )
  }

  return (
    <>
      <div className='overflow-x-auto'>
        {data.data.length > 0 ? (
          <table className='table  text-d-dark-dark-purple table-zebra'>
            <thead>
              <tr className='bg-d-dark-dark-purple text-d-white'>
                <th />
                <th>Transaction Id</th>
                <th>Open Store Type</th>
                <th>Request Timestamp</th>
                <th>Transaction Time</th>
                <th>Details</th>
                <th>Status</th>
                <th>Store ID</th>
                <th>User ID</th>
                <th>User Client ID</th>
                <th>User Client</th>
              </tr>
            </thead>

            <tbody>
              {data.data.map((item) => {
              // const fecha = new Date(item.Fecha)
              // const mes = fecha.toLocaleString('default', { month: 'long' })
              // const dia = fecha.getDate()
              // const hora = fecha.toLocaleTimeString()
                return (
                  <tr key={item.transactionId}>
                    <td />
                    <td>{item.transactionId}</td>
                    <td>{item.openStoreType}</td>
                    <td>{item.requestTimestamp}</td>
                    <td>{item.transactionTime}</td>
                    <td>
                      <ul>
                        {item.results.restocked && item.results.restocked.length > 0
                          ? (
                              item.results.restocked.map((restockedItem) => (
                                <li key={restockedItem.productId}>
                                  Product: {restockedItem.productId}, QTY: {restockedItem.quantity}
                                </li>
                              ))
                            )
                          : (
                            <li>No restocked items</li>
                            )}
                      </ul>
                    </td>

                    {/* <td>{item.Producto}</td>
                  <td>{item.Añadidos}</td>
                  <td>{item.Removidos}</td>
                  <td>{item.Tienda}</td>
                  <td>{item['ID Reponedor']}</td>
                  <td>{item['Nombre Reponedor']}</td>
                  <td>{item.Fecha}</td>
                  <td>{mes}</td>
                  <td>{dia}</td>
                  <td>{hora}</td> */}
                    <td>{item.status}</td>
                    <td>{item.storeId}</td>
                    <td>{item.userId}</td>
                    <td>{item.userClientId}</td>
                    <td>{item.userClient ? item.userClient : 'No user client'}</td>
                  </tr>
                )
              })}

            </tbody>

          </table>

        ) : (
          <div className=''>
            <p className='text-center'>No hay datos disponibles</p>
          </div>
        )}
      </div>
    </>
  )
}
