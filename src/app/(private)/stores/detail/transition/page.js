'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import DspLoader from '@/components/admin/common/loader'
import ErrorMessage from '@/components/admin/common/error'
import StoreLayout from '@/app/(private)/stores/detail/storeLayout'
import { getLayout } from '@/api/layout'
import useGetTransitionLayout from '@/hooks/useGetTransitionLayout'
import TransitionLayoutModal from '../TransitionModal'
import GoBack from '@/components/admin/common/goback'
import useGetReiteProd from '@/hooks/useGetReiteProd'

const LayoutComparison = () => {
  const searchParams = useSearchParams()
  const storeId = searchParams.get('storeId')
  const layoutId = searchParams.get('layoutId')

  const [oldLayout, setOldLayout] = useState(null)
  const [targetLayout, setTargetLayout] = useState(null)
  const [transitionLayouts, setTransitionLayouts] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedTransitionLayout, setSelectedTransitionLayout] = useState(null)
  const [filteredOldProducts, setFilteredOldProducts] = useState([])
  const [filteredTargetProducts, setFilteredTargetProducts] = useState([])

  const { layout: transitionLayout, layoutLoad } = useGetTransitionLayout(storeId, layoutId)
  const { products, loading, error } = useGetReiteProd()

  useEffect(() => {
    const fetchLayouts = async () => {
      if (transitionLayout) {
        try {
          setTransitionLayouts(transitionLayout.transitionLayouts)
          const oldLayoutData = await getLayout(transitionLayout.oldLayout)
          const targetLayoutData = await getLayout(transitionLayout.targetLayout)
          setTargetLayout(targetLayoutData)
          setOldLayout(oldLayoutData)
        } catch (error) {
          console.error(error)
        }
      }
    }
    fetchLayouts()
  }, [transitionLayout])

  useEffect(() => {
    if (oldLayout && targetLayout) {
      const filterProductsByLayout = (layout, products) =>
        products.filter(product =>
          layout.trays.some(tray =>
            tray.columns.some(column =>
              column.productId === product.productId
            )
          )
        )

      setFilteredOldProducts(filterProductsByLayout(oldLayout, products))
      setFilteredTargetProducts(filterProductsByLayout(targetLayout, products))
    }
  }, [oldLayout, targetLayout, products])

  const handleViewTransition = async (transitionId) => {
    try {
      const layoutData = await getLayout(transitionId)
      setSelectedTransitionLayout(layoutData)
      setModalOpen(true)
    } catch (error) {
      console.error(error)
    }
  }

  const handleCloseModal = () => {
    setModalOpen(false)
    setSelectedTransitionLayout(null)
  }

  if (layoutLoad || loading) {
    return <DspLoader />
  }

  if (error) {
    return <ErrorMessage />
  }

  if (!oldLayout || !targetLayout) {
    return null
  }

  return (
    <>
      <div className='p-4'>
        <GoBack />
        <div className='flex p-4 overflow-auto'>
          <div className='w-1/3 p-2'>
            <h2 className='text-center font-bold tracking-wider'>ANTIGUO LAYOUT</h2>
            {filteredOldProducts.length > 0 && (
              <StoreLayout layout={oldLayout} products={filteredOldProducts} />
            )}
          </div>
          <div className='flex items-center'>
            <svg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 16 16'>
              <path fill='#000000' fillRule='evenodd' d='M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8' clipRule='evenodd' />
            </svg>
          </div>
          <div className='w-1/3 p-2'>
            <h2 className='text-center font-bold tracking-wider'>NEW LAYOUT</h2>
            {filteredTargetProducts.length > 0 && (
              <StoreLayout layout={targetLayout} products={filteredTargetProducts} />
            )}
          </div>
          <div className='flex bg-d-dark-dark-purple rounded-lg p-4 mt-10 text-sm text-white w-1/4 h-1/2' role='alert'>
            <svg className='w-5 h-5 inline mr-3' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z' clipRule='evenodd' />
            </svg>
            <div>
              <h3>Status:<span className='font-medium italic text-d-soft-soft-purple'> In transition..</span></h3>
              {transitionLayouts.map((transitionId, index) => (
                <div key={index} className='flex items-center hover' onClick={() => handleViewTransition(transitionId)}>
                  <h3 className='mr-2'>Transición {index + 1}</h3>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
                    <path fill='none' stroke='#ffffff' strokeLinecap='round' strokeLinejoin='round' strokeWidth='1.5' d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9m3.75 11.625a2.625 2.625 0 1 1-5.25 0a2.625 2.625 0 0 1 5.25 0' />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <TransitionLayoutModal
        open={modalOpen}
        onClose={handleCloseModal}
        layout={selectedTransitionLayout}
        products={products}
      />
    </>
  )
}

export default LayoutComparison
