import Link from 'next/link'

export default function ROrdersTable (props) {
  const { rorders, edit, showTraining, showExpiration } = props
  return (
    <>
      {/* <pre>{JSON.stringify(rorders, null, 2)}</pre> */}
      {rorders &&
        <div className='overflow-x-auto'>
          <table key={showTraining + '_' + showExpiration} className='table text-d-dark-dark-purple  table-zebra w-full'>
            <thead>
              <tr className='bg-d-dark-dark-purple text-d-white'>
                <th>Detalle</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>Inicio</th>
                <th>Término</th>
                <th>Notas</th>
                <th>Status</th>
                <th>ID Tienda de destino</th>
                {/* <th>ID Bodega de destino</th> */}
                {/* <th>ID Usuario asignado</th> */}
                <th>Tienda de destino</th>
                {/* <th>Operaciones de picking</th> */}

              </tr>
            </thead>
            <tbody>
              {rorders.map((rorder, index) =>

                <tr key={index}>
                  <td>
                    <div className='join'>
                      <button onClick={() => edit(rorder)} className='join-item btn btn-square btn-sm btn-outline text-d-dark-dark-purple border-d-dark-dark-purple hover:bg-d-dark-dark-purple hover:text-d-white'>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                        </svg>

                      </button>
                      <Link href={'/admin/replenishment-orders/' + rorder.id}>
                        <button className='join-item  btn btn-square btn-sm btn-outline   text-d-dark-dark-purple border-d-dark-dark-purple hover:bg-d-dark-dark-purple hover:text-d-white'>
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-5 h-5'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z' />
                          </svg>
                        </button>

                      </Link>
                    </div>
                    {/* { rorder.picking_operation && rorder.picking_operation.map(
                      (po) =>
                      <pre>{JSON.stringify(po, null, 2)}</pre>
                    )
                    } */}
                  </td>
                  <td>
                    {rorder.id}
                    {/* <pre>{JSON.stringify(rorder, null, 2)}</pre> */}
                  </td>
                  <td>{rorder.name}</td>
                  <td>{rorder.start_date && (rorder.start_date.split('T')[0].split('-')[2] + '/' + rorder.start_date.split('T')[0].split('-')[1] + '/' + rorder.start_date.split('T')[0].split('-')[0])/* (new Date(product.manufacture_date)) */}</td>
                  <td>{rorder.end_date && (rorder.end_date.split('T')[0].split('-')[2] + '/' + rorder.end_date.split('T')[0].split('-')[1] + '/' + rorder.end_date.split('T')[0].split('-')[0])/* (new Date(product.manufacture_date)) */}</td>
                  <td>{rorder.notes}</td>
                  <td>{rorder.status}</td>
                  <td>{rorder.destination_store_id}</td>
                  {/* <td>{rorder.destination_warehouse_id}</td> */}
                  {/* <td>{rorder.assigned_app_user_id}</td> */}
                  <td>
                    {/* <pre>{JSON.stringify(rorder.destination_store, null, 2)}</pre> */}
                    {rorder.destination_store.name}
                  </td>

                </tr>
              )}
            </tbody>

          </table>
        </div>}
    </>
  )
}
