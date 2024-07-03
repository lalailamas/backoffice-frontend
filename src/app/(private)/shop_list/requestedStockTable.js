/**
 * RequestedStockTable component renders a table showing the requested stock for each store.
 * @param {Object[]} data - The data containing store and product information.
 */
function RequestedStockTable ({ data }) {
  const storeNames = data.map((store) => store.storeName)
  const tableData = data.reduce((table, store) => {
    if (store.products) {
      store.products.forEach((product) => {
        if (!table[product.productName]) {
          table[product.productName] = {
            category: product.category,
            aisle: product.aisle
          }
        }
        table[product.productName][store.storeName] = product.requested
      })
    }
    return table
  }, {})

  const rows = Object.keys(tableData).map((productName) => {
    const cells = storeNames.map((storeName) => (
      <td key={storeName}>{tableData[productName][storeName] || 0}</td>
    ))
    const { category, aisle } = tableData[productName]
    return (
      <tr key={productName}>
        <td>{category}</td>
        <td>{aisle}</td>
        <td>{productName}</td>
        {cells}
      </tr>
    )
  })

  return (
    <div className='overflow-x-auto'>
      {data.length > 0
        ? (
          <table className='table text-d-dark-dark-purple table-zebra w-full max-[431px]:hidden'>
            <thead>
              <tr className='bg-d-dark-dark-purple text-d-white'>
                <th>Categoría</th>
                <th>Pasillo</th>

                <th>Producto</th>
                {storeNames.map((storeName) => (
                  <th key={storeName}>{storeName}</th>
                ))}
              </tr>
            </thead>
            <tbody>

              {
                rows
                }
            </tbody>
          </table>
          )
        : (
          <div className='p-10 mt-10'>
            <p className='text-center'>No hay datos disponibles</p>
          </div>
          )}
    </div>
  )
}

export default RequestedStockTable
