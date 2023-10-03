'use client'
import React, { useEffect, useState } from 'react'
import { getInventoryByStore } from '@/api/store'
import { getLayout } from '@/api/layout'
import { getAllReiteData } from '@/api/product/reite'
import DspLoader from '@/components/admin/common/loader'
import AccordeonCard from '../acordeonCard'
import { useSearchParams } from 'next/navigation'
// import AccordeonCard from './acordeonCard'

function StepTwo () {
  const searchParams = useSearchParams()
  const externalId = searchParams.get('external_id')
  const layoutId = searchParams.get('layout_id')
  const storeName = searchParams.get('store_name')

  const [inventory, setInventory] = useState([])
  const [layout, setLayout] = useState([])
  const [products, setProducts] = useState([])

  // const shouldFetchData = selectedStore && currentStep === 2
  const [render, setRender] = useState(false)

  useEffect(() => {
    console.log(searchParams, 'search params getAll')
    console.log('use effect call')
    console.log(externalId, 'external_id')
    console.log(layoutId, 'layout_id')
    if (externalId && layoutId) {
      fetchInventoryAndLayout(externalId)
    } else return alert('this is not working')
  }, [render])
  // const resetStepTwo = () => {
  //   // Restablecer los estados relevantes para StepTwo
  //   // Puedes usar setSelectedStore, setCurrentStep u otros estados según sea necesario
  //   setInventory([])
  //   setLayout([])
  //   // ... restablecer otros estados ...
  // }

  async function fetchInventoryAndLayout (storeId) {
    console.log('fetch')
    try {
      const inventoryResponse = await getInventoryByStore(storeId)
      console.log('la respuesta del coso')
      console.log(inventoryResponse.data)
      if (inventoryResponse.data) {
        setInventory(inventoryResponse.data)

        const layoutResponse = await getLayout(layoutId)
        setLayout(layoutResponse.data)
        fetchProducts(inventoryResponse.data)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  async function fetchProducts (inventory) {
    console.log('entré al fetchProducts')
    try {
      const productsResponse = await getAllReiteData()
      console.log('aca tengo los products', productsResponse.data)
      setProducts(productsResponse.data)
      setRender(true)
    } catch (error) {
      console.error('Error fetching products:', error)
    }
  }

  return (
    <div className='px-4 md:px-6 lg:px-8'>
      {externalId && (
        <div className='text-center mb-4 md:mb-8'>
          <h1 className='text-d-dark-dark-purple text-2x2 font-bold'>Confirma el inventario de {storeName}</h1>
        </div>
      )}
      {
        !render
          ? <DspLoader />
          : layout && layout.trays && layout.trays.map((tray, index) => {
            return (
              <div key={index} className='text-center border-b-2 border-gray-300 pb-5 mb-5 md:mb-8'>
                <h2 className='text-d-soft-purple text-2x2 font-bold pb-5 mb-5 md:mb-8'>Bandeja N°{index}</h2>
                <div className='flex flex-col md:flex-row gap-4 items-center md:items-start'>

                  {
                  tray
                    ? tray.columns.map((column, index) => {
                      const product = products.filter((product) => product.productId === column.productId)
                      const quantityProd = inventory.products.find((prod) => prod.productId === column.productId)
                      const maxQuantity = column.maxQuantity
                      console.log('aca tengo el product', product)
                      console.log('aca tengo el quantityProd', quantityProd ? quantityProd.quantity : 'No encontrado')
                      return (
                        <AccordeonCard
                          key={index}
                          initialQuantity={quantityProd ? quantityProd.quantity : 0}
                          maxQuantity={maxQuantity}
                          header={
                            <div className=' gap-3 items-center justify-center'>
                              <figure className='flex justify-center'>
                                <img
                                  className='w-auto max-w-[50px] h-[50px]'
                                  src={product[0].metadata.imageUrl}
                                  width={120}
                                  height={120}
                                  alt='Product'
                                />
                              </figure>
                              <h1 className='flex justify-center items-center text-d-title-purple font-bold m-1'>{product[0].productName}</h1>
                              {/* <p className='ml-auto font-bold text-d-dark-dark-purple'> {quantityProd ? `${quantityProd.quantity}/${maxQuantity}` : '??'}</p> */}
                            </div>
                        }
                        />
                      // <div key={index}>
                      //   <pre>{JSON.stringify(inventory, null, 2)}</pre>
                      // </div>

                      )
                    })
                    : null
                }
                </div>
              </div>

            )
          })

      }

    </div>

  )
}

export default StepTwo
