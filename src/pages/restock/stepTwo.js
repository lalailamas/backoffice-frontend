import React, { useEffect, useState } from 'react'
import { getInventoryByStore } from '../api/store'
import { getLayout } from '../api/layout'
import { getAllReiteData } from '../api/product/reite'
import DspLoader from '@/components/admin/common/loader'
import AccordeonCard from './acordeonCard'
// import AccordeonCard from './acordeonCard'

function StepTwo ({ selectedStore, currentStep }) {
  const [inventory, setInventory] = useState([])
  const [layout, setLayout] = useState([])
  const [products, setProducts] = useState([])

  const shouldFetchData = selectedStore && currentStep === 2
  const [render, setRender] = useState(false)

  useEffect(() => {
    if (shouldFetchData) {
      fetchInventoryAndLayout(selectedStore.external_id)
    } else {
      resetStepTwo()
      setRender(false)
    }
  }, [shouldFetchData, selectedStore, render])
  const resetStepTwo = () => {
    // Restablecer los estados relevantes para StepTwo
    // Puedes usar setSelectedStore, setCurrentStep u otros estados según sea necesario
    setInventory([])
    setLayout([])
    // ... restablecer otros estados ...
  }

  async function fetchInventoryAndLayout (storeId) {
    try {
      const inventoryResponse = await getInventoryByStore(storeId)
      console.log('la respuesta del coso')
      console.log(inventoryResponse.data)
      if (inventoryResponse.data) {
        setInventory(inventoryResponse.data)
        const layoutId = selectedStore.layout_id
        const layoutResponse = await getLayout(layoutId)
        setLayout(layoutResponse.data)
        fetchProducts(inventoryResponse.data)
      }
    } catch (error) {
      console.error('Error fetching inventory or layout:', error)
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
    <div>
      {selectedStore
        ? <div><h1 className='text-d-dark-dark-purple text-2xl font-bold text-center'>Confirma el inventario de {selectedStore.name} </h1></div>
        : null}
      {
        !render
          ? <DspLoader />
          : layout && layout.trays && layout.trays.map((tray, index) => {
            return (
              <div key={index} className='text-center border-b-2 border-gray-300 pb-5 mb-5'>
                <h2 className='text-d-soft-purple text-2x2 font-bold'>Bandeja N°{index}</h2>
                <div className='flex gap-5 justify-center'>

                  {
                  tray
                    ? tray.columns.map((column, index) => {
                      const product = products.filter((product) => product.productId === column.productId)
                      const quantityProd = inventory.products.find((prod) => prod.productId === column.productId)
                      console.log('aca tengo el product', product)
                      console.log('aca tengo el quantityProd', quantityProd ? quantityProd.quantity : 'No encontrado')
                      return (
                        <AccordeonCard
                          key={index}
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
                              <p className='ml-auto font-bold text-d-dark-dark-purple'> {quantityProd ? quantityProd.quantity : '??'}</p>
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
