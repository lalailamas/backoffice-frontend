import React from 'react'

function TransactionList () {
  // Datos hardcodeados de transacciones
  const transactions = [
    {
      id: 1,
      date: '2023-11-01',
      description: 'Compra en tienda A',
      amount: 5000
    },
    {
      id: 2,
      date: '2023-11-05',
      description: 'Pago de factura de servicios',
      amount: 2590
    },
    {
      id: 3,
      date: '2023-11-10',
      description: 'Compra en línea',
      amount: 890
    }
    // Agrega más transacciones aquí...
  ]

  return (
    <div>
      {/* <h2 className='font-semibold mb-5 underline'>Lista de Transacciones</h2> */}
      <ul className='grid grid-cols-1 gap-4 overflow-x-auto'>
        {transactions.map((transaction) => (
          <li key={transaction.id} className='bg-white border p-4 rounded-lg shadow-md'>
            <div className='space-y-4'>
              <div>
                <h2 className='font-semibold'>Fecha</h2>
                <span>{transaction.date}</span>
              </div>
              <div>
                <h2 className='font-semibold'>Descripción</h2>
                <span>{transaction.description}</span>
              </div>
              <div>
                <h2 className='font-semibold'>Monto</h2>
                <span>
                  {transaction.amount.toLocaleString('es-CL', {
                    style: 'currency',
                    currency: 'CLP'
                  })}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TransactionList
