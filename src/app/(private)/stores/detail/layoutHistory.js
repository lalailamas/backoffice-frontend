import { getLayoutHistory, getAllLayouts } from '@/api/layout'
import React, { useEffect, useState } from 'react'
import { swallError } from '@/utils/sweetAlerts'
import DatePicker from '@/components/admin/common/datepicker/double'
import dayjs from 'dayjs'

/**
 * LayoutHistory component displays the history of layouts for a given store.
 * It allows users to filter the history by date range and view details of products in each layout.
 *
 * @param {string} storeId - The ID of the store.
 * @param {Array} products - The list of products.
 * @returns {JSX.Element} The rendered LayoutHistory component.
 */
function LayoutHistory ({ storeId, products }) {
  const [layouts, setLayouts] = useState([])
  const [allLayouts, setAllLayouts] = useState({})
  const [selectedProducts, setSelectedProducts] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(1, 'month').startOf('month').toDate(),
    endDate: dayjs().subtract(1, 'month').endOf('month').toDate()
  })

  const productMap = products.reduce((map, product) => {
    map[product.productId] = product.productName
    return map
  }, {})

  useEffect(() => {
    const fetchAllLayouts = async () => {
      try {
        const response = await getAllLayouts()
        const layoutMap = response.reduce((map, layout) => {
          map[layout.id] = layout.name
          return map
        }, {})
        setAllLayouts(layoutMap)
      } catch (error) {
        swallError('Error al obtener todos los layouts', false)
      }
    }

    fetchAllLayouts()
  }, [])

  useEffect(() => {
    if (dateRange.startDate !== null && dateRange.endDate !== null) {
      const formattedStartDate = dayjs(dateRange.startDate).format('YYYY-MM-DD')
      const formattedEndDate = dayjs(dateRange.endDate).format('YYYY-MM-DD')
      getLayoutHistory(storeId, formattedStartDate, formattedEndDate, 1, 1000)
        .then((response) => {
          setLayouts(response.rows)
        })
        .catch((error) => {
          swallError('Error al obtener el historial de layout', false)
          console.error('Error fetching layout history:', error)
        })
    }
  }, [dateRange])

  const openModal = (products) => {
    const productNames = products.map((productId) => productMap[productId] || productId)
    productNames.sort()
    setSelectedProducts(productNames)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProducts([])
  }

  const handleDateChange = (newDateRange) => {
    const formattedStartDate = dayjs(newDateRange.startDate).format('YYYY-MM-DD')
    const formattedEndDate = dayjs(newDateRange.endDate).format('YYYY-MM-DD')
    setLayouts([]) // Reset data
    setDateRange({ startDate: formattedStartDate, endDate: formattedEndDate })
  }

  return (
    <div className='overflow-x-auto h-screen'>
      <div className='w-full px-10 mt-2'>
        <DatePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          handleDateChange={handleDateChange}
        />
      </div>
      <div className='p-2'>
        <table className='table text-d-dark-dark-purple table-zebra mt-8 p-8 overflow-x-auto'>
          <thead>
            <tr className='bg-d-dark-dark-purple text-d-white'>
              <th className='px-4 py-2'>ID</th>
              <th className='px-4 py-2'>Store ID</th>
              <th className='px-4 py-2'>Nombre de Layout</th>
              <th className='px-4 py-2'>Fecha de Inicio</th>
              <th className='px-4 py-2'>Fecha de Término</th>
              <th className='px-4 py-2'>En Transición</th>
              <th className='px-4 py-2'>Productos</th>
              <th className='px-4 py-2'>Fecha de Creación</th>
            </tr>
          </thead>
          <tbody>
            {layouts.length > 0
              ? (
                  layouts.map((item) => (
                    <tr key={item.id}>
                      <td className='border px-4 py-2'>{item.id}</td>
                      <td className='border px-4 py-2'>{item.store_id}</td>
                      <td className='border px-4 py-2'>{allLayouts[item.layout_id] || item.layout_id}</td>
                      <td className='border px-4 py-2'>{dayjs(item.start_date).format('DD/MM/YYYY')}</td>
                      <td className='border px-4 py-2'>{item.end_date ? dayjs(item.end_date).format('DD/MM/YYYY') : 'N/A'}</td>
                      <td className='border px-4 py-2'>{item.is_transition ? 'Sí' : 'No'}</td>
                      <td className='border px-4 py-2'>
                        <button
                          className='btn rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
                          onClick={() => openModal(item.products_id)}
                        >
                          Ver Detalle
                        </button>
                      </td>
                      <td className='border px-4 py-2'>{dayjs(item.createdAt).format('DD/MM/YYYY')}</td>
                    </tr>
                  ))
                )
              : (
                <tr>
                  <td className='border px-4 py-2' colSpan='8'>
                    No hay historial de layout disponible
                  </td>
                </tr>
                )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-4 rounded'>
            <h2 className='text-xl mb-4 font-bold'>Productos</h2>
            <ul className='list-disc list-inside'>
              {selectedProducts.map((product, index) => (
                <li key={index}>{product}</li>
              ))}
            </ul>
            <div className='p-2 flex justify-center'>
              <button
                type='button'
                databehavior='cancel'
                className='btn text-xs join-item rounded-full'
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LayoutHistory
