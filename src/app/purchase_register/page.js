'use client'
import React from 'react'

function PurchaseRegister () {
  const purchases = [
    {
      id_compra: 12345,
      fecha_compra: '2023-12-28',
      cantidad_productos: 5,
      usuario: 'acordoba',
      tienda_destino: 'HUB Cenco'
    },
    {
      id_compra: 54321,
      fecha_compra: '2023-12-27',
      cantidad_productos: 3,
      usuario: 'gbaratti',
      tienda_destino: 'PUC Lo Contador'
    },
    {
      id_compra: 54321,
      fecha_compra: '2023-12-27',
      cantidad_productos: 3,
      usuario: 'gbaratti',
      tienda_destino: 'PUC Lo Contador'
    },
    {
      id_compra: 54321,
      fecha_compra: '2023-12-27',
      cantidad_productos: 3,
      usuario: 'gbaratti',
      tienda_destino: 'PUC Lo Contador'
    },
    {
      id_compra: 54321,
      fecha_compra: '2023-12-27',
      cantidad_productos: 3,
      usuario: 'gbaratti',
      tienda_destino: 'PUC Lo Contador'
    },
    {
      id_compra: 54321,
      fecha_compra: '2023-12-27',
      cantidad_productos: 3,
      usuario: 'gbaratti',
      tienda_destino: 'PUC Lo Contador'
    }
  ]

  return (
    <>
      <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center p-4'>Registro de Compras</h2>

      <div className='overflow-x-auto p-5'>
        <table className='table text-d-dark-dark-purple table-zebra mt-8 p-8'>
          <thead>
            <tr className='bg-d-dark-dark-purple text-d-white'>
              <th>ID Compra</th>
              <th>Fecha de compra</th>
              <th>Cantidad productos</th>
              <th>Usuario Jumbo</th>
              <th>Tienda de destino</th>
            </tr>
          </thead>
          <tbody>
            {purchases.map((purchase, index) => (
              <tr key={index}>
                <td>{purchase.id_compra}</td>
                <td>{purchase.fecha_compra}</td>
                <td>{purchase.cantidad_productos}</td>
                <td>{purchase.usuario}</td>
                <td>{purchase.tienda_destino}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PurchaseRegister
