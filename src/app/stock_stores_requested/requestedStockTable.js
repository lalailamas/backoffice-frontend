import React from 'react'

function RequestedStockTable ({ data }) {
  // Obtener una lista única de nombres de tiendas
  const storeNames = data.map((store) => store.storeName)

  // Construir la estructura de datos para la tabla
  const tableData = data.reduce((table, store) => {
    if (store.products) {
      store.products.forEach((product) => {
        if (!table[product.productName]) {
          table[product.productName] = {}
        }
        table[product.productName][store.storeName] = product.requested
      })
    }
    return table
  }, {})

  // Obtener las filas y celdas de la tabla
  const rows = Object.keys(tableData).map((productName) => {
    const cells = storeNames.map((storeName) => (
      <td key={storeName}>{tableData[productName][storeName] || 0}</td>
    ))
    return (
      <tr key={productName}>
        <td>{productName}</td>
        {cells}
      </tr>
    )
  })

  return (
    <div>
      <div className='overflow-x-auto'>
        {data.length > 0
          ? (
            <table className='table text-d-dark-dark-purple table-zebra w-full max-[431px]:hidden'>
              <thead>
                <tr className='bg-d-dark-dark-purple text-d-white'>
                  <th>Producto</th>
                  {storeNames.map((storeName) => (
                    <th key={storeName}>{storeName}</th>
                  ))}
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </table>
            )
          : (
            <div className=''>
              <p className='text-center'>No hay datos disponibles</p>
            </div>
            )}
      </div>
    </div>
  )
}

export default RequestedStockTable
