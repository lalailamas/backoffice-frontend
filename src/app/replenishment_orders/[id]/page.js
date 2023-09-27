'use client'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import InsideLayout from '@/components/admin/layouts/inside'
import useGetROrders from '@/hooks/useROrders'
import { useEffect, useRef, useState } from 'react'
import ROrdersTable from '@/components/admin/tables/replenishment-orders'
import Pager from '@/components/admin/common/pager'
import DspApi from '@/lib/api'
import EditROrderModal from '@/components/admin/modals/replenishment-orders/edit/page'
import useGetWarehouses from '@/hooks/useWarehouses'
import S from '@/lib/storage'
import { SearchField } from '@/components/admin/common/search'
import Datepicker from 'react-tailwindcss-datepicker'
import { useRouter } from 'next/router'
import Link from 'next/link'
import DspLoader from '@/components/admin/common/loader'
import useGetStores from '@/hooks/useStores'

const inter = Inter({ subsets: ['latin'] })

export default function Inventory () {
  const router = useRouter()
  const { id } = router.query
  const [params, setParams] = useState({ limit: 100, page: 1, search: '' })
  const { stores, meta, error, loading } = useGetStores(params, 0)
  const { warehouses } = useGetWarehouses(params, 0)
  const [currentROrder, setCurrentROrder] = useState(null)

  const pad = (num, size) => {
    num = num.toString()
    while (num.length < size) num = '0' + num
    return num
  }

  useEffect(
    () => {
      if (router.isReady) {
        DspApi.getReplenishmentOrder(id).then((response) => {
          setCurrentROrder(response.data)
        }).catch(
          (error) => {
            console.log(error.message)
          }
        )
      }
    },
    [router.isReady]
  )

  if (!currentROrder || !stores || !warehouses) {
    return <DspLoader />
  }

  return (
    <>

      <div className='w-full p-8'>

        <div class='text-sm breadcrumbs'>
          <ul>
            <li><Link href='/admin/replenishment-orders'>Órdenes de reabastecimiento</Link></li>
            <li>{currentROrder.name}</li>
          </ul>
        </div>

        <div className='grid grid-cols-12 w-full'>
          <div className='col-span-12 md:col-span-6 shadow-lg p-4'>
            <h2 className='border-b border-b-d-soft-green pb-2 mb-2 font-bold'>{currentROrder.name}</h2>
            <div className='grid grid-cols-12'>
              <div className='col-span-12 md:col-span-6 text-sm'>
                <strong>Tienda de destino:</strong>
              </div>
              <div className='col-span-12 md:col-span-6 text-sm'>
                {stores.filter(s => { return s.id == currentROrder.destination_store_id })[0].name}
              </div>
              <div className='col-span-12 md:col-span-6 text-sm'>
                <strong>Fecha de inicio:</strong>
              </div>
              <div className='col-span-12 md:col-span-6 text-sm'>
                {pad((new Date(currentROrder.start_date)).getDate(), 2)}/{pad((new Date(currentROrder.start_date)).getMonth(), 2)}/{pad((new Date(currentROrder.start_date)).getFullYear(), 2)} {currentROrder.start_date.split('T')[1].split('.')[0]}
              </div>

              <div className='col-span-12 md:col-span-6 text-sm'>
                <strong>Fecha de término:</strong>
              </div>
              <div className='col-span-12 md:col-span-6 text-sm'>
                {pad((new Date(currentROrder.end_date)).getDate(), 2)}/{pad((new Date(currentROrder.end_date)).getMonth(), 2)}/{pad((new Date(currentROrder.end_date)).getFullYear(), 2)} {currentROrder.end_date.split('T')[1].split('.')[0]}
              </div>
            </div>

          </div>
          <div className='col-span-12 md:col-span-6 grid grid-cols-12 shadow-lg p-4'>
            <div className='col-span-12 text-sm'>
              <strong>Notas</strong>
              <div>{currentROrder.notes}</div>
            </div>

          </div>
          {currentROrder.picking_operation.map((po, index) =>
            <>
              <div className='col-span-12 shadow-lg p-4'>
                <div className='border-b border-b-d-soft-green pb-2 mb-2'><strong>Resumen de operación de picking #{index + 1}</strong></div>
                <div className='grid grid-cols-12'>
                  <div className='col-span-12 md:col-span-2 border-r border-r-d-soft-green'>
                    <strong>
                      <div>{warehouses.find(w => w.id == po.origin_warehouse_id).name}</div>
                    </strong>
                  </div>

                  <div className='col-span-12 md:col-span-10'>
                    <table className='table'>
                      <thead>
                        <tr className=''>
                          <th className='font-bold'>Producto</th>
                          <th className='font-bold'>Stock solicitado</th>
                          <th className='font-bold'>Stock bodega</th>
                          <th className='font-bold'>Transferido desde bodega</th>
                          <th className='font-bold'>Encontrado</th>
                          <th className='font-bold'>No encontrado</th>
                          <th className='font-bold'>% Rate</th>
                        </tr>

                      </thead>
                      <tbody>
                        {po.picking_operation_product.map((pop) =>

                          <tr key={pop.id} className=''>
                            <th className=''>{pop.warehouse_product.product.name}</th>
                            <td className=''>{pop.requested_stock}</td>
                            <td className=''>{pop.warehouse_product.stock}</td>
                            <td className=''>-</td>
                            <td className=''>{pop.found_stock}</td>
                            <td className=''>-</td>
                          </tr>

                        )}

                      </tbody>

                    </table>

                  </div>

                </div>
              </div>
            </>

          )}

        </div>
        {/* <pre className="bg-d-dark-dark-purple text-d-white text-xs w-full">{JSON.stringify(currentROrder, null, 2)}</pre> */}

      </div>

    </>

  )
}

Inventory.getLayout = function getLayout (page) {
  return (
    <InsideLayout>{page}</InsideLayout>
  )
}
