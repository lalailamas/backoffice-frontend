import React from 'react'

function ShopListTable ({ data }) {
  console.log(data, 'data')
  return (
    <div>
      <div className='overflow-x-auto'>
        {data.length > 0
          ? (
            <table className='table text-d-dark-dark-purple table-zebra w-full max-[431px]:hidden'>
              <thead>
                <tr className='bg-d-dark-dark-purple text-d-white'>

                  <th>Producto</th>
                  <th>Solicitado</th>
                  <th>Categoría</th>

                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.productId}>
                    <td>{item.productName}</td>
                    <td>{item.requested}</td>
                    <td>{item.aisle || null}</td>
                  </tr>))}
              </tbody>
            </table>
            )
          : null}
      </div>
    </div>
  )
}

export default ShopListTable
