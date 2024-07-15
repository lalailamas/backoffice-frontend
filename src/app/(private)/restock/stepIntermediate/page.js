'use client'
import React, { useEffect, useState } from 'react'
import StepLayout from '../stepLayout'
import { useSearchParams } from 'next/navigation'
import SimpleModal from '@/components/admin/modals/simpleModal'
import { compareLayouts } from '@/api/layout'
import DspLoader from '@/components/admin/common/loader'
import useGetReiteProd from '@/hooks/useGetReiteProd'
import useGetLayout from '@/hooks/useGetLayout'

function StepIntermediate () {
  const searchParams = useSearchParams()
  const showStepIntermediate = searchParams.get('show_step_intermediate') === 'true'
  const oldLayout = searchParams.get('old_layout')
  const transitionLayout = searchParams.get('layout_id')
  const { products, loading } = useGetReiteProd()
  const [modalVisible, setModalVisible] = useState(false)
  const [layoutComparison, setLayoutComparison] = useState(null)
  const { layout } = useGetLayout(oldLayout)
  console.log(layout, 'layout')

  useEffect(() => {
    setModalVisible(true)
  }, [])

  const handleConfirmationModal = () => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    const fetchComparison = async () => {
      try {
        const response = await compareLayouts(oldLayout, transitionLayout)
        setLayoutComparison(response)
        console.log(response, 'respuesta')
      } catch (error) {
        console.error('Error al comparar los layouts:', error)
      }
    }
    fetchComparison()
  }, [oldLayout, transitionLayout])

  if (loading || !layoutComparison) {
    return <DspLoader />
  }

  return (
    <>
      <div className='text-center'>
        <StepLayout showStepIntermediate={showStepIntermediate} />
        {modalVisible && (
          <div className='fixed z-50 flex items-center justify-center'>
            <SimpleModal
              handleConfirmationModal={handleConfirmationModal}
              title='Estamos cambiando algunos productos de lugar'
              message='Sigue las instrucciones indicadas en pantalla'
              cancelButtonText='OK, Continuar'
            />
          </div>
        )}
        <div className='px-4 md:px-6 lg:px-8'>
          <div>
            <h3 className='text-d-soft-purple text-xl font-bold p-2'>PRODUCTOS A ELIMINAR</h3>
            {layout.trays.map((tray, trayIndex) => (
              <div key={trayIndex} className='text-center border-b-2 border-gray-300 pb-5 mb-5 md:mb-8'>
                <div className='bg-d-dark-dark-purple'>
                  <h4 className='text-d-soft-purple text-medium font-bold py-2 mb-2 md:mb-8'>Bandeja {trayIndex + 1}</h4>
                </div>
                <div className='flex flex-row gap-2 items-center overflow-x-auto'>
                  {tray.columns.map((column, columnIndex) => {
                    const productData = products.find(p => p.productId === column.productId)
                    const isToRemove = layoutComparison.productsToRemove.some(p => p.productId === column.productId)
                    return (
                      <div
                        key={columnIndex}
                        className={`w-[230px] h-[200px] flex flex-col items-center py-4 align-center rounded shadow-lg ${
                          isToRemove ? 'bg-red-300' : ''
                        }`}
                      >
                        <figure className='flex justify-center'>
                          <img
                            className='w-auto max-w-[50px] h-[50px]'
                            src={productData?.metadata?.imageUrl}
                            width={120}
                            height={120}
                            alt='Product'
                          />
                        </figure>
                        <h1 className='flex justify-center items-center text-d-title-purple font-bold m-1'>{productData?.productName}</h1>

                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default StepIntermediate
