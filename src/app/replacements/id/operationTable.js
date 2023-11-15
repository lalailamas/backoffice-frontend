import React from 'react'

function OperationTable ({ data }) {
  function stockDifference (stockBefore, stockAfter) {
    return stockAfter - stockBefore
  }
  const stockColorDifference = (stockBefore, stockAfter) => {
    const difference = stockAfter - stockBefore

    if (difference > 0) {
      return 'text-green-500'
    } else if (difference < 0) {
      return 'text-red-500'
    } else {
      return 'zero'
    }
  }
  return (
    <>
      <div className='overflow-x-auto'>
        {data
          ? (
            <table className='table text-d-dark-dark-purple table-zebra w-full max-[431px]:hidden'>
              <thead>
                <tr className='bg-d-dark-dark-purple text-d-white'>
                  <th />
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Imagen</th>
                  <th>Stock BO</th>
                  <th>Stock Físico</th>
                  <th>Diferencia Stock</th>
                  <th>Agregados</th>
                  <th>Retirados</th>

                </tr>
              </thead>

              <tbody>
                {data.products.map((item) => (
                  <tr key={item.productId}>
                    <td />
                    <td>{item.productId}</td>
                    <td>{item.productName}</td>
                    <td>
                      <img src={item.img} alt={item.productName} className='w-16 h-16 object-cover mb-2' />
                    </td>
                    <td>{item.stockBefore}</td>
                    <td>{item.stockAfter}</td>
                    <td className={stockColorDifference(item.stockBefore, item.stockAfter)}>{stockDifference(item.stockBefore, item.stockAfter)}</td>
                    {/* Asegúrate de que data.results sea un objeto antes de intentar acceder a sus propiedades */}
                    <td>{data.results?.restocked?.find((restockedItem) => restockedItem.productId === item.productId)?.quantity || 0}</td>
                    <td>{data.results?.purchased?.find((purchasedItem) => purchasedItem.productId === item.productId)?.quantity || 0}</td>
                  </tr>
                ))}

              </tbody>
            </table>
            )
          : (
            <div className=''>
              <p className='text-center'>No hay datos disponibles</p>
            </div>
            )}
      </div>
    </>
  )
}

export default OperationTable

// {
//   "id": 12,
//   "external_transaction_id": "179a1ea6-2e9e-40dc-a247-e3cbc9e60074",
//   "store_id": "DEV_CNV_002",
//   "start_timestamp": "2023-11-06T13:39:39.619Z",
//   "end_timestamp": "2023-11-06T13:45:08.638Z",
//   "comments": "string de prueba",
//   "start_image_url": null,
//   "end_image_url": null,
//   "products": [
//     {
//       "productId": "DEV_CNV_048",
//       "productName": "Redbull 250ml",
//       "img": "https://storage.googleapis.com/reite-store-products/RED_BULL_250.webp",
//       "stockBefore": 7,
//       "stockAfter": 7
//     },
//     {
//       "productId": "DEV_CNV_059",
//       "productName": "Yogurt Protein con Frutos Secos 150gr",
//       "img": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_059/YOGHURT_PROTEIN_FRUTOS_SECOS.webp",
//       "stockBefore": 6,
//       "stockAfter": 6
//     },
//     {
//       "productId": "DEV_CNV_057",
//       "productName": "Galleta Tritón Vainilla 126gr",
//       "img": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_057/TRITON_126.webp",
//       "stockBefore": 7,
//       "stockAfter": 7
//     }
//   ],
//   "results": {
//     "after": [],
//     "purchased": [
//       {
//         "quantity": 2,
//         "productId": "DEV_CNV_004"
//       },
//       {
//         "quantity": 2,
//         "productId": "DEV_CNV_006"
//       }
//     ],
//     "restocked": [
//       {
//         "quantity": 2,
//         "productId": "DEV_CNV_004"
//       },
//       {
//         "quantity": 2,
//         "productId": "DEV_CNV_006"
//       },
//       {
//         "quantity": 3,
//         "productId": "DEV_gNfXKMwp6zNULBXQ5hy9"
//       }
//     ],
//     "before": []
//   }
// }
