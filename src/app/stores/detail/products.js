import DspLoader from '@/components/admin/common/loader'
import React from 'react'

function Products ({ loader, products, inventory, newQuantity, storeId, layout, expandedRows, setExpandedRows }) {
  return (
    <div className='p-8'>
      {loader
        ? (
          <DspLoader />
          )
        : (
          <table className='table  text-d-dark-dark-purple table-zebra mt-8 p-8 max-[431px]:hidden'>
            <thead>
              <tr className='bg-d-dark-dark-purple text-d-white'>
                <th />
                <th>Imagen</th>
                <th>Producto</th>
                <th>Stock actual</th>
                <th>Stock máximo</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {layout?.trays?.map((tray, trayIndex) => (
                tray.columns.map((column, columnIndex) => {
                  const product = products.find((product) => product.productId === column.productId)
                  const quantityProd = inventory.find((prod) => prod.productId === product.productId)
                  const maxQuantity = column.maxQuantity

                  return (
                    <tr key={`${trayIndex}-${columnIndex}`}>
                      <td />
                      <td>
                        <img src={product.metadata.imageUrl} alt={product.productName} className='w-10 h-10' />
                      </td>
                      <td>{product.productName}</td>
                      <td>
                        {newQuantity && newQuantity[product.productId]
                          ? `${newQuantity[product.productId]}`
                          : quantityProd && quantityProd.quantity
                            ? `${quantityProd.quantity}`
                            : 0}
                      </td>
                      <td>{maxQuantity}</td>
                      <td>
                        {Object.entries(product.prices)
                          .filter(([key]) => key === storeId)
                          .map(([key, value]) => (
                            <td key={key}>
                              $ {value}
                            </td>
                          ))}
                      </td>
                    </tr>
                  )
                })
              ))}
            </tbody>
          </table>
          )}
    </div>
  )
}

export default Products
